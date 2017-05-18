import _ from 'lodash';
import request from 'request';
import Promise from 'bluebird';

Promise.promisifyAll(request, {multiArgs: true});

// const get = (url) =>
//   request.getAsync({uri: url, json: true}).then(response => response.body);

const get = (urls) =>
  Promise.map(urls, (url) =>
    request.getAsync(url).spread((response) =>
      [JSON.parse(response.body), url]
    )
  );

const post = (url, data) =>
  request.postAsync(_.merge({uri: url, json: true}, data ? {body: data} : null))
         .then(response => response.body);

const put = (url, data) =>
  request.putAsync(_.merge({uri: url, json: true}, data ? {body: data} : null))
         .then(response => response.body);

const remove = (url) =>
  request.delAsync({uri: url, json: true});

export default {
  get,
  post,
  put,
  del: remove,
};
