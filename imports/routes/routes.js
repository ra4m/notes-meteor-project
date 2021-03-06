import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Session } from 'meteor/session';
import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isAuthenticatedPage = currentPagePrivacy === 'auth';
  const isUnauthenticatedPage = currentPagePrivacy === 'unauth';

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};

const onEnterNotePage = nextState => {
  Session.set('selectedNoteId', nextState.params.id);
};

const onLeaveNotePage = () => {
  Session.set('selectedNoteId', undefined);
};

const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
};

const globalOnEnter = nextState => {
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set('currentPagePrivacy', lastRoute.privacy);
};

export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route path="/" component={Login} privacy="unauth" />
      <Route path="/signup" component={Signup} privacy="unauth" />
      <Route path="/dashboard" component={Dashboard} privacy="auth" />
      <Route
        path="/dashboard/:id"
        component={Dashboard}
        privacy="auth"
        onEnter={onEnterNotePage}
        onLeave={onLeaveNotePage}
      />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);
