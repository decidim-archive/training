import _ from 'lodash';
import data from './lib/data';

// const allData = data.sessions();

// var chainedTags = _(data.sessions)
//                         .map(function (elem) { return elem.meta; })
//                         .reduce(function (memo, elem) { return _.concat(memo, elem.tags)});

// var chainedTags2 = _.reduce(data.sessions, function (memo, elem) {
//   return _.concat(memo, elem.meta.tags);
// }, []);

// var keys = _.reduce(data.sessions, function (memo, elem) {
//   return _.concat(memo, _.keys(elem.meta));
// }, []);

// var keysFn = function (coll, prop) {
//   return _.reduce(coll, function (memo, elem) {
//     return _.concat(memo, _.keys(_.get(elem, prop)));
//   }, []);
// }

// var durations = _.reduce(data.sessions, function (memo, elem) {
//   return _.concat(memo, elem.meta.duration);
// }, []);

// var tags = _.reduce(data.sessions, function (memo, elem) {
//   return _.concat(memo, elem.meta.tags);
// }, []);

// var filterObj = _.reduce(_.uniq(keys), function (memo, key) {
//   memo[key] = [];
//   return memo;
// }, {});

// var val = 23;

// var obj = {val: val};

// const obj = {val};

// console.log(JSON.stringify(filterObj, null, '  '));
