import React from 'react';
import { Router, Route, browserHistory} from 'react-router';
import ReactDOM from 'react-dom';
import Promise from 'bluebird';

import { defaultLocale } from '../../config/base-settings';

import data from './lib/data';
import session from './lib/session';
import filters from './lib/filters';

import CurriculaUI from './components/CurriculaUI';
import SelectionPrint from './components/SelectionPrint';

import '../scss/app.scss';

ReactDOM.render(
  <Router history={browserHistory} >
    <Route path="/" component={CurriculaUI} />
    <Route path="/print" component={SelectionPrint} />
  </Router>,
  document.getElementById('curricula-ui')
);

Promise.all([data.fetch(defaultLocale.code)])
  .then(() => session.reset(data.sessions()))
  .then(() => filters.set());
