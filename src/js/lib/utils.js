import _ from 'lodash';
import moment from 'moment';
import humanizeDuration from 'humanize-duration';
import data from './data';

// Number -> Number -> [any] -> [any]
// Swap two adjacent elements of an array.

const swap = (idx, to, ary) => {
  const size = _.size(ary);

  // Protect the upper and lower bounds.
  if (idx === to ||
      idx < 0 ||
      idx > size - 1 ||
      to < 0 ||
      to > size - 1) {
    return ary;
  }

  // Make sure that idx < to.
  const i = idx < to ? idx : to;
  const j = idx < to ? to : idx;

  // The parts of the array we don't change.
  const left = _.take(ary, i);
  const right = _.drop(ary, j + 1);

  // Assemble the new array.
  return _.concat(left, ary[j], ary[i], right);
};

// String -> [any] -> [{}] -> [{}]
// Given an identifier, a list of values and a list of objects with a key
// that is the same as the identifier, return a list of objects where there
// value of identifier has to be in the list of values.
// The returned list of objects is in the same order as the list of values.
// This function is written for clarity and not for performance.
const filterInOrder = (key, orderedVals, objs) =>
  _.map(orderedVals, (val) => _.find(objs, {[key]: val}));

// String/Integer -> string.
// accepts duration in minutes and outputs a string of humanized time.
const durationFormat = (ddate, locale) => {
  moment.relativeTimeThreshold('h', 9);
  moment.relativeTimeThreshold('m', 60);
  moment.relativeTimeThreshold('s', 1);
  const duration = humanizeDuration(moment.duration({
    minutes: ddate
  }).asMilliseconds(), {language: locale || 'en'});
  return duration;
};

const getIcon = (name) => {
  const icon = name ? _.find(data.icons(), (ic) => ic.label === name) : {};
  return icon ? icon.icon : 'fa-tags';
};

// string,string -> object
// accepts an id and type of extra (ex. activities or materials) and returns the matched extra

const getActivity = (id) => {
  const a = _.find(data.activities(), (act) => act.id === id);
  return a ? a.title : '';
};
const getActivityTitle = (id) => {
  const a = getActivity(id);
  const title = a;
  return _.toString(title);
};

const getActivities = (ids) => {
  const activity = _.filter(data.activities(), (ext) => _.includes(ext.id, ids));
  return activity;
};
const activitiesTitle = (ids) => {
  const a = getActivities(ids);
  const title = _.map(a, 'title');
  return title;
};
const getMaterials = (ids) => {
  const material = _.filter(data.materials(), (ext) => ext.id === ids);
  return material;
};
const materialsTitle = (ids) => {
  const a = getMaterials(ids);
  const title = _.map(a, 'title');
  return title;
};
const getCounts = (filter, prop) => {
  const c = _.filter(data.sessions(), (v) =>
  _.includes(v[prop], filter));
  return _.size(c);
};

const getAttachments = (ids) => {
  const a = _.filter(data.materials(), (ext) => _.includes(ids, ext.id) && !_.isEmpty(ext.links));
  return _.flatten(_.map(a, 'links'));
};

export {
  swap, filterInOrder, durationFormat, getCounts, getActivity, getActivityTitle,
  getActivities, activitiesTitle, getAttachments,
  materialsTitle, getMaterials, getIcon,
};
