/* eslint no-return-assign: 0 */
/* eslint no-unused-vars: 0 */
import Metalsmith from 'metalsmith';
import _ from 'lodash';
import collections from 'metalsmith-collections';
import paths from 'metalsmith-paths';
import {parse, transform} from 'metalsmith-transmark';
import {markdownMetaMarker} from 'transmark';

import {plugin as drafts} from './lib/drafts';
import {plugin as render} from './lib/render';

import {material, activity, methodology} from './lib/transformation';
import {sections} from './config/base-settings';


const order = _.map(sections, 'title'); // set the order collections in the data.json file

// create an object to supply to the metaalsmith-collections plugin
const collectionsObj = _.reduce(sections, (memo, section) =>
  _.merge(memo, {[section.title]: section.files})
, {});

// create an object to supply to the metalsmith-transmark.parse plugin's extension argument
const parseExtNames = _.filter(sections, (section) => (section.parse));
const parseExtensions = () => {
  let parseStr = '[\u000A';
  _.forEach(parseExtNames, (ext) =>
    parseStr = `${parseStr} markdownMetaMarker('${ext.metaTitle}'), \u000A`
  );
  parseStr = `${parseStr}\u000A]`;
  return parseStr;
};

const parserMeta = _.reduce(parseExtNames, (memo, section) =>
  _.merge(memo, {[section.title]: []})
, {});

new Metalsmith(__dirname)
  .metadata({
    transmark: {},
  })
  // TODO:10 This is not nice, I should whitelist directories, rather than
  //       blacklisting.
  .ignore(['node_modules', 'index.html', '.git', 'metalsmith.js', '.babelrc', '.eslintrc',
    '_*.md', '.gitignore', 'test.json', 'lib', '**/*.png', '**/*.pdf', 'package.json', 'README'])
  .source('./content')
  .destination('./public/data')
  .use(drafts())
  // #done:0 Remove the dependency to metalsmith-paths.
  .use(paths())
  .use(collections(collectionsObj))
  .use(parse({
    extensions:
    [
      markdownMetaMarker('methodology'),
      markdownMetaMarker('material'),
      markdownMetaMarker('activity')
    ],
    meta: parserMeta,
    order
  }))
  .use(transform({handlers: {material, activity, methodology}, order}))
  .use(render())
  .build(err => {
    if (err) { throw err; }
  });
