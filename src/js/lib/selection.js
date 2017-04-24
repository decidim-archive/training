import _ from 'lodash';
import Bacon from 'baconjs';
import dispatcher from './dispatcher';

import data from './data';
import {swap, filterInOrder} from './utils';

const d = dispatcher();

const defaults = [];

// [Session] -> [Number]
// Given a list of sessions, return a list of id's.
const selectionIds = _.partialRight(_.map, 'id');

// [Number] -> [Session]
// Given a list of id's return a list of sessions, that has the same order
// as the list of id's.
const selection = (ids) =>
  filterInOrder('id', ids, data.sessions());

// helper methods
const getTags = (sessionsSet) =>
  _.reduce(sessionsSet, (memo, elem) =>
    _.uniq(_.concat(memo, elem.meta.tags)), []);

const getDurations = (sessionsSet) =>
  _.reduce(sessionsSet, (memo, elem) =>
    _.concat(memo, elem.meta.duration), []);

const getDurationsUnique = (sessionSet) => {
  const uniqDurations = _.uniq(getDurations(sessionSet));
  return uniqDurations;
};

const getDurationsSum = (sessionSet) => {
  const uniqDurations = _.sum(getDurations(sessionSet));
  return uniqDurations;
};

const getMaterials = (sessionsSet) =>
  _.reduce(sessionsSet, (memo, elem) =>
    _.uniq(_.concat(memo, elem.materials)), []);

// [Session] -> Number -> [Session]
// Given a list of sessions and an id, return the list of sessions
// appended with the session of the respective id.
const addToSelection = (prev, id) => {
  const ids = _.concat(selectionIds(prev), id);
  return selection(ids);
};

// [Session] -> Number -> [Session]
// Given a list of sessions and an id, retur the list of sessions with
// the sessions of the respective id removed.
const removeFromSelection = (prev, id) => {
  const ids = _.reject(selectionIds(prev), (i) => i === id);
  return selection(ids);
};

// [Session] -> (Number, String) -> [Session]
// Given a list of sessions and a tuple containing an id and an operation,
// return the list of sessions in a new order. The operation can either be
// 'up' or 'down'.
const moveSelection = (prev, [id, op]) => {
  const ids = selectionIds(prev);
  const idx = _.indexOf(ids, id);
  const to = op === 'up' ? idx - 1 : idx + 1;

  return selection(swap(idx, to, ids));
};

// Reset the selection to defaults.
const resetSelection = () => defaults;

// [Session] -> [Array of selection summaries]
// Summarize selections
const selectionSummary = (selections) => {
  // get the number of selected session
  const selectionSize = _.size(selections);


  let summary = {};
  summary = _.merge(summary, {size: selectionSize,
    duration: getDurationsSum(selections),
    materials: getMaterials(selections)});
  return summary;
};

// Public API

export default {
  selectionSummary, selection,
  getMaterials, getDurations, getDurationsSum, getDurationsUnique, getTags,

  toItemsProperty: () =>
    Bacon.update(
      defaults,
      [d.stream('add')], addToSelection,
      [d.stream('remove')], removeFromSelection,
      [d.stream('move')], moveSelection,
      [d.stream('reset')], resetSelection),

  add: id => d.push('add', id),
  remove: id => d.push('remove', id),
  moveUp: id => d.push('move', [id, 'up']),
  moveDown: id => d.push('move', [id, 'down']),
  reset: () => d.push('reset'),
};
