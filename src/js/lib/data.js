import _ from 'lodash';

import http from './http';
import { dataSource, dataSourcePath, defaultLocale, locales } from '../../../config/base-settings';

const sections = ['curriculas',
                  'icebreakers',
                  'materials',
                  'activities',
                  'filters',
                  'phrases',
                  'icons'];

const uiElements = [
  'phrases',
  'icons'
];
// We cache our app data in this object. Initialize the data object with empty
// arrays.
const appData = _.reduce(sections, (memo, section) =>
  _.merge(memo, {[section]: []})
, {});

const appUI = _.reduce(uiElements, (memo, section) =>
  _.merge(memo, {[section]: []})
, {});

const dataURL = (dataSource === 'local') ?
  `${document.location.origin}/${dataSourcePath}` :
  dataSourcePath;

export const fetch = (locale) => {
  const l = locale ? locale : defaultLocale.code;
  const urls = [
    `${dataURL}/${l}-data.json`,
    `${dataURL}/${l}-ui.json`,
  ];
  http.get(urls)
    .then(data => {
      _.each(data[0][0], (v, k) => {appData[k] = v;});
      _.merge(appUI, { phrases: data[1][0].phrasing, icons: data[0][1].iconmap });
    });
  // http.get(`${dataURL}/${l}-data.json`)
  // .tap(data => _.each(data, (v, k) => {appData[k] = v;}));

  // http.get(`${dataURL}/${l}-ui.json`)
  // .tap(data =>  _.merge(appUI, { phrases: data.phrasing, icons: data.iconmap }));
}

export default {
  fetch,
  sessions: () => appData.curriculas,
  icebreakers: () => appData.icebreakers,
  materials: () => appData.materials,
  activities: () => appData.activities,
  appFilters: () => appData.filters,
  phrases: () => appUI.phrases,
  icons: () => appUI.icons,
  locales: () => locales,
  defaultLocale: () => defaultLocale,
};
