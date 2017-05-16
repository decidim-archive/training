
/* This script checks whether custom configuration.scss and typo.scss files or assets exists,
   then copies the files into the session UI NPM module folder replacing the original files
   and rebuilding the NPM package.
*/

const fs = require('fs-extra');
const path = require('path');
const childProcess = require('child_process');

/** Configuration ***/

const pathToCustomFiles = '../customisations';
const pathToSrcAssets = '../assets';
const pathToDestAssets = 'public/assets/images/';
const pathToModule = './node_modules/session-ui-npm';
const buildScript = 'scripts/build.js';
const configScss = 'configuration.scss';
const typoScss = 'typo.scss';
const moduleScss = 'src/scss/';

/********************/

let needsRebuilt = false;
const destAssets = buildPath(pathToModule, pathToDestAssets);
const pathToModuleScss = buildPath(pathToModule, moduleScss);
const moduleBuildScript = buildPath(pathToModule, buildScript);
const configurationScssFileSrc = buildPath(pathToCustomFiles, configScss);
const configurationScssFileDest = buildPath(pathToModuleScss, configScss);
const typoScssFileSrc = buildPath(pathToCustomFiles, typoScss);
const typoScssFileDest = buildPath(pathToModuleScss, typoScss);


// Copying styles
if (fs.existsSync(pathToCustomFiles)) {
    console.log('Copying custom styles into Session UI NPM module...');
    copyFiles(configurationScssFileSrc, configurationScssFileDest);
    copyFiles(typoScssFileSrc, typoScssFileDest);
    needsRebuilt = true;
}

// Copying assets
if (fs.existsSync(pathToSrcAssets)) {
  console.log('Copying assets into Session UI NPM module...');
  copyFiles(pathToSrcAssets, destAssets);
  needsRebuilt = true;
}

// Rebuilding module
if (needsRebuilt) {
  rebuildModule();
}



function rebuildModule() {
  console.log('Rebuilding Session UI NPM module...');
  process.chdir(pathToModule);
  childProcess.fork(moduleBuildScript);
}

function copyFiles(src, dest) {
  fs.copySync(src, dest);
}

function buildPath(pathToFile, file) {
  return path.resolve(pathToFile, file);
}
