//
// DATA AND UI SETTINGS.
// These are the settings that are used for both the DATA repository
// and the Curricula-UI repository.
//

// List available languages
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

// Default language
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

module.exports = {
  locales: locales,
  defaultLocale: defaultLocale,
  dataSource: dataSource,
  dataSourcePath: dataSourcePath,
}
