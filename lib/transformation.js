/* eslint no-param-reassign: ["error", { "props": false }] */
import _ from 'lodash/fp';
import { sliceHeading, cutHeading, replaceToken,
        balanceSection} from 'transmark';

export const material = (metaData, zipper) => {
  const uuid = zipper.cursor.content;
  // const headingLevel = currentHeading(zipper);
  const headingLevel = 'h5';
  const replacement = sliceHeading(_.first(metaData.uuid[uuid]));
  const s = replaceToken(balanceSection(headingLevel, replacement), zipper);
  s.meta.materials.push(uuid);
  return s;
};

export const activity = (metaData, zipper) => {
  const uuid = zipper.cursor.content;
  const headingLevel = 'h5';
  const replacement = cutHeading(_.first(metaData.uuid[uuid]));
  const s = replaceToken(balanceSection(headingLevel, replacement), zipper);
    // const s = transformations.snippet(metaData, zipper);
  s.meta.activities.push(uuid);
  return s;
};

export const methodology = (metaData, zipper) => {
  const uuid = zipper.cursor.content;
  const headingLevel = 'h5';
  const replacement = cutHeading(_.first(metaData.uuid[uuid]));
  const s = replaceToken(balanceSection(headingLevel, replacement), zipper);
    // const s = transformations.snippet(metaData, zipper);
  s.meta.methodologies.push(uuid);
  return s;
};

export default { material, activity, methodology };
