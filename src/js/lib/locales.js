import _ from 'lodash';
import Bacon from 'baconjs';
import dispatcher from './dispatcher';

import data from './data';

const d = dispatcher();
const defaults = data.defaultLocale();

const setLocale = defaults;

const updateLocale = (prev, locale) => {
  const l = _.filter(data.locales(), {code: locale});
  return _.merge({}, {code: l[0].code, name: l[0].name});
};

export default {
  toItemsProperty: () =>
  Bacon.update(
    defaults,
    [d.stream('update')], updateLocale,
    [d.stream('set')], setLocale),
  update: (locale) => d.push('update', locale),
  set: () => d.push('set'),
};
