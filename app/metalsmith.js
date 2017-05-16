import Metalsmith from 'metalsmith';
import collections from 'metalsmith-collections';
import paths from 'metalsmith-paths';
import {parse, transform} from 'metalsmith-transmark';
import {markdownMetaMarker} from 'transmark';

import {plugin as drafts} from './lib/drafts';
import {plugin as render} from './lib/render';

import {material, activity} from './lib/transformation';

new Metalsmith(__dirname)
  .metadata({
    transmark: {},
  })
  // TODO:10 This is not nice, I should whitelist directories, rather than
  //       blacklisting.
  .ignore(['node_modules', 'index.html', '.git', 'metalsmith.js', '.babelrc', '.eslintrc.json',
  '_*.md', '.gitignore', 'test.json', 'lib', '**/*.png', '**/*.pdf', 'package.json', 'README', 'base-settings.js', 'iconmap.json', 'phrasing.json'])
  .source('../content')
  .destination('_site/data')
  .use(drafts())
  .use(paths())
  .use(collections({
    activities: '**/*/Activities/*.md',
    materials: '**/*/Materials.md',
    curriculas: '**/*/Workshops/*.md',
  }))
  .use(parse({extensions: [markdownMetaMarker('material'),
                           markdownMetaMarker('activity')],
              meta: {activities: [], materials: []}}))
  .use(transform({handlers: {material, activity}}))
  .use(render())
  .build(err => {
    if (err) { throw err; }
  });
