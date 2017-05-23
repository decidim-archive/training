/* eslint object-shorthand: 0 */


/**
* Configuration settings for your project.
*/


/**
* UI settings
*
* Set the languages that the content is availble in
*/
const locales = [
  {
    code: 'es',
    name: 'Español',
  },
  // {
  //   code: 'en',
  //   name: 'English',
  // },
];

/**
* Set the default language
*/
const defaultLocale = {
  code: 'es',
  name: 'Espanol',
};


// UI SETTINGS

// Set the Data Source.
// 'local' picks the required data files from the '_site/data' directory
// 'remote' require a valid URL to the api or location of the data files.

const dataSource = 'local';
const dataSourcePath = 'data';

// export const dataSource = 'remote';
// export const dataSourcePath = 'http://localhost:8000/data/'

//
//

/**
* CONTENT SETTINGS
*
* Set the sections of content you would like to publish.
* Each item in the list below should have a correspoding folder in the content/<language>/ folder.
*
*/

const sections = [
  {
    title: 'materials', // The name to be used for the collection
    metaTitle: 'material', // The keyword used by transmark for referencing
    files: '**/*/Materials.md', // The glob path to the markdown files
    parse: true, // Flag this collection for parsing
    transform: true // Flag this collection for tranformation
  },
  {
    title: 'activities', // The name to be used for the collection
    metaTitle: 'activity', // The keyword used by transmark for referencing
    files: '**/*/Activities/*.md', // The glob path to the markdown files
    parse: true, // Flag this collection for parsing
    transform: true // Flag this collection for tranformation
  },
  {
    title: 'methodologies', // The name to be used for the collection
    metaTitle: 'methodology', // The keyword used by transmark for referencing
    files: '**/*/Methodologies/*.md', // The glob path to the markdown files
    parse: true, // Flag this collection for parsing
    transform: true // Flag this collection for tranformation
  },
  {
    title: 'curriculas', // The name to be used for the collection
    metaTitle: 'curricula', // The keyword used by transmark for referencing
    files: '**/*/Workshops/*.md', // The glob path to the markdown files
    parse: false, // Flag this collection for parsing
    transform: false // Flag this collection for tranformation
  }
];


module.exports = {
  locales: locales,
  defaultLocale: defaultLocale,
  dataSource: dataSource,
  dataSourcePath: dataSourcePath,
  sections: sections,
};
