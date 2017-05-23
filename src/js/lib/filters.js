import _ from 'lodash';
import Bacon from 'baconjs';

import data from './data';
import dispatcher from './dispatcher';


const d = dispatcher();

const setFilters = () => {
  const newObj = _.zipObject(_.flatten(_.values(data.appFilters())));
  const newTypeObj = _.zipObject(_.flatten(_.values(data.appTypes())));

  const f = ['types', 'tags'];

  const fObj = _.reduce(f, (memo, ff) =>
    _.merge(memo, {[ff]: {}}),
    {});

  const tagObj = _.each(newObj, (v, k) => _.merge(fObj.tags, {[k]: false}));
  const typeObj = _.each(newTypeObj, (v, k) => _.merge(fObj.types, {[k]: false}));
  const nObj = _.merge(fObj, {
    types: typeObj,
    tags: tagObj
  });
  return nObj;
};

const updateFilters = (prev, {filter, state, className}) => {
  let s = {};
  if (className.indexOf('tags') !== -1) {
    s = _.merge(prev, {tags: {[filter]: state}});
  } else {
    s = _.merge(prev, {types: {[filter]: state}});
  }
  return s;
};
const defaults = setFilters();

export default {
  toItemsProperty: () =>
    Bacon.update(
      defaults,
      [d.stream('update')], updateFilters,
      [d.stream('set')], setFilters),
  update: (filter, state, className) => d.push('update', {filter, state, className}),
  set: () => d.push('set'),
};
