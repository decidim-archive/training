/* eslint no-param-reassign: 0 */
import _ from 'lodash';
import {basename} from 'path';

export const plugin = () =>
  (files, metalsmith, done) => {
    setImmediate(done);
    Object.keys(files).forEach(file => {
      if (_.startsWith(basename(file), '_')) delete files[file];
    });
  };
