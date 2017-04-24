let dataUrl;
let phrasingUrl;
let iconsUrl;

switch (document.location.origin) {
  // staging
  case 'https://session.stg.tacticaltech.org': {
    dataUrl = 'https://putitbackon.stg.tacticaltech.org/data.json';
    phrasingUrl = 'https://putitbackon.stg.tacticaltech.org/session-phrasing.json';
    iconsUrl = 'https://putitbackon.stg.tacticaltech.org/session-iconmap.json';
    break;
  }
  // production
  case 'https://curriculum.tacticaltech.org': {
    dataUrl = 'https://curriculum-data.tacticaltech.org/data.json';
    phrasingUrl = 'https://curriculum-data.tacticaltech.org/session-phrasing.json';
    iconsUrl = 'https://curriculum-data.tacticaltech.org/session-iconmap.json';
    break;
  }
  // development
  default: {
    dataUrl = `${document.location.origin}/data.json`;
    phrasingUrl = `${document.location.origin}/session-phrasing.json`;
    iconsUrl = `${document.location.origin}/session-iconmap.json`;
    break;
  }
}

export default {dataUrl, phrasingUrl, iconsUrl};
