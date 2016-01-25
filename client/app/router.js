import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import AppView from './app';

const appContainer = document.getElementById('app');

render((
  <Router history={browserHistory}>
    <Route path="/" component={AppView}>
    </Route>
  </Router>
), appContainer);
