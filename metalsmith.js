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

const order = _.map(sections, 'title');

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
  .use(collections({
    activities: '**/*/Activities/*.md',
    materials: '**/*/Materials.md',
    curriculas: '**/*/Workshops/*.md',
    methodologies: '**/*/Methodologies/*.md',
  }))
  .use(parse({
    extensions: [
      markdownMetaMarker('methodology'),
      markdownMetaMarker('material'),
      markdownMetaMarker('activity')
    ],
    meta: {
      activities: [],
      materials: [],
      methodologies: []
    },
    order
  }))
  .use(transform({handlers: {material, activity, methodology}, order}))
  .use(render())
  .build(err => {
    if (err) { throw err; }
  });
