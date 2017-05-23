/* eslint no-param-reassign: ["error", {"props": false}] */
import _ from 'lodash/fp';
import winston from 'winston';
import fs from 'fs';

import {toHtml, subSections, cutHeading, sectionTitle,
        metaSection, transform} from 'transmark';

import settings from '../config/base-settings';

const compactObj = obj =>
  _.reduce((memo, [key, value]) =>
    (_.isNil(value) ? memo : _.merge(memo, {[key]: value}))
  , {}, _.toPairs(obj));

const mergeConcatArrays = (objValue, srcValue) =>
  (_.isArray(objValue) ? _.concat(objValue, srcValue) : undefined);

const toData = _.flow([cutHeading, toHtml]);

const compileMaterials = _.reduce((memo, zipper) => {
  const title = sectionTitle(zipper);
  const {uuid, links, locale} = metaSection(zipper);
  const data = toData(zipper);
  return _.concat(memo, {title, id: uuid, locale, links, data});
}, []);

const compilePrerequesites = _.reduce((memo, p) => {
  const title = sectionTitle(p);
  const data = toData(p);
  return _.concat(memo, compactObj({title, data}));
}, []);

const compileSections = _.reduce((memo, s) => {
  const title = sectionTitle(s);
  const meta = metaSection(s);
  const {duration} = meta;
  const data = toData(s);
  return _.concat(memo, compactObj({title, data, duration, meta}));
}, []);

const compileCurriculas = curriculas =>
  _.reduce((memo, [, zipper]) => {
    const title = sectionTitle(zipper);
    const meta = metaSection(zipper);
    const id = meta.uuid;
    const {duration} = meta;
    const {tags} = meta;
    const {item} = meta;
    // Create an array of arrays.
    const [prerequesites, sections] = _.map(subSections, subSections(zipper));

    return _.concat(memo, {title,
      id,
      item,
      duration,
      meta,
      tags,
      materials: _.map(m =>
      _.merge({}, {id: m})
      , _.uniq(zipper.meta.materials || [])),
      activities: _.map(a =>
      _.merge({}, {id: a})
      , _.uniq(zipper.meta.activities || [])),
      sections: compileSections(sections),
      prerequesites: compilePrerequesites(prerequesites)});
  }, [], _.toPairs(curriculas));

const markerTransform = _.curry((fieldName, metaData, zipper) => {
  const uuid = zipper.cursor.content;
  zipper.meta = _.mergeWith(mergeConcatArrays,
                            zipper.meta,
                            {[fieldName]: [uuid]});
  return zipper;
});

const fetchJSON = (locale, filename) =>
  fs.readFileSync(`${__dirname}/../config/${locale}/${filename}.json`, 'utf8');

export const plugin = () =>
  (files, metalsmith, done) => {
    const locales = settings.locales;
    const defaultData = {
      curriculas: {},
      activities: {},
      methodologies: {},
      materials: {},
      filters: {},
    };
    const {transmark, collections} = metalsmith.metadata();
    const transformer = transform(transmark, {
      material: markerTransform('materials'),
      activity: markerTransform('activities'),
      methodology: markerTransform('methodologies'),
    });

    // TODO:0 Order unfortunately still matters.
    const orderedColl = [
      ['materials', collections.materials],
      ['methodologies', collections.methodologies],
      ['activities', collections.activities],
      ['curriculas', collections.curriculas],
    ];

    const data = _.reduce((memo, [collection, collectionFiles]) =>
      _.merge(memo, {[collection]: _.reduce((acc, file) =>
        _.merge(acc, {[file.path.href]: file.transmark})
      , {}, collectionFiles)})
    , defaultData, orderedColl);

    const transformed = _.reduce((memo, [collection, collectionFiles]) =>
      _.merge(memo, {[collection]: _.reduce((acc, [path, file]) =>
        _.merge(acc, {[path]: transformer(file)})
      , {}, _.toPairs(collectionFiles))})
    , {}, _.toPairs(data));


    const allData = locale => {
      const activities = compileCurriculas(transformed.activities);
      const methodologies = compileCurriculas(transformed.methodologies);

      const curriculas = _.filter(
        {meta: {locale}},
        _.concat(
          compileCurriculas(transformed.curriculas),
            _.concat(
              methodologies,
              activities
            )
        )
      );
      const filters = _.uniq(_.flatMap('tags', curriculas));
      const d = _.merge({}, {
        curriculas,
        activities,
        methodologies,
        materials: _.filter({locale}, compileMaterials(transmark.tags.material)),
        filters,
      });
      return d;
    };

    // Directly overriding files didn't work for me, so first delete all
    // existing files, and then set out rendered json file.
    _.forEach(file => delete files[file], _.keys(files));
    _.forEach(locale => {
      const d = JSON.stringify(allData(locale.code));
      const ui = JSON.stringify(_.merge({}, {
        phrasing: JSON.parse(fetchJSON(locale.code, 'phrasing')),
        iconmap: JSON.parse(fetchJSON(locale.code, 'iconmap')),
      }));

      winston.info(`Writing data for ${locale.name} - (${locale.code})`);
      files[`${locale.code}-data.json`] = {contents: new Buffer(d)};

      winston.info(`Writing UI strings for ${locale.name} - (${locale.code})`);
      files[`${locale.code}-ui.json`] = {contents: new Buffer(ui)};
    }, locales);

    // Needed for the deploy. It's silly, I know.
    files['index.html'] = {contents: new Buffer('')};
    done();
  };
