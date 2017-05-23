import _ from 'lodash';
import Bacon from 'baconjs';

import selections from './selection';
import data from './data';
import filters from './filters';
import dispatcher from './dispatcher';

const d = dispatcher();
// const defaults = data.sessions();


const filterSessions = (prev, update) => {
  const fils = _(update.filtersState.tags).pickBy().keys().value();
  const its = _(update.filtersState.types).pickBy().keys().value();
  const sels = _.map(update.selections, 'id');
  const currsByItem = (!_.isEmpty(its)) ?
    _.filter(data.sessions(), (c) =>
      _.includes(its, c.item))
    : data.sessions();
  const fCurr = (!_.isEmpty(fils)) ?
    _.filter(currsByItem, (c) =>
      _.size(_.intersection(fils, c.tags)) > 0
  ) : currsByItem;
  return _.each(fCurr, (c) => {
    _.merge(c, {selected: _.includes(sels, c.id)});
  });
};


const setSessions = () => {
  const curr = _.map(data.sessions());
  return _.each(curr, (c) => {
    _.merge(c, {selected: false});
  });
};

// Not only views can subscribe to updates from streams, but other sections of
// our business logic as well. The listing of all available session is
// dependent on the current selection.
const selectionsP = selections.toItemsProperty();
const filtersP = filters.toItemsProperty();

// combine filters and selection into a single bacon template.
const updaters = {
  filtersState: [],
  selections: [],
};

const updatersP = Bacon.combineTemplate({
  filtersState: filtersP,
  selections: selectionsP,
});

// check for new selection or filter click and update the displayed sessions
updatersP.onValue(updater => {
  _.each(updater, (v, k) => { updaters[k] = v; });
  d.push('filter', updaters);
});

const defaults = setSessions(data.sessions());

// Public API
export default {
  toItemsProperty: () =>
    Bacon.update(
      defaults,
      [d.stream('set')], setSessions,
      [d.stream('filter')], filterSessions),

  reset: (sessions = defaults) => d.push('set', sessions),
};
