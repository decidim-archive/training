// List available languages
const locales = [
  {
    code: 'es',
    name: 'Español',
  },/*,
  {
    code: 'en',
    name: 'English',
  },*/
];

// Default language
const defaultLocale = {
  code: 'es',
  name: 'Español',
};


// Source for the JSON files in this directory if running locally
const dataSourcePath = 'data';


// APP SETTINGS **************************************************************************

// Set the Data Source.
// 'local' picks the required data files from the '_site/data' directory
// 'remote' require a valid URL to the api or location of the data files.

// output for the React app
const buildPath = '_site';
// the public directory with assets like vendor js and css
const publicPath = 'public';

const dataSource = 'local';

module.exports = {
  buildPath: buildPath,
  publicPath: publicPath,
  locales: locales,
  defaultLocale: defaultLocale,
  dataSource: dataSource,
  dataSourcePath: dataSourcePath,
}


