import {Meteor} from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, Switch, Redirect} from "react-router";
import {Tracker} from "meteor/tracker";
import {createBrowserHistory} from "history";

import Login from "../imports/ui/Login";
import Signup from "../imports/ui/Signup";
import Link from "../imports/ui/Link";
import NotFound from "../imports/ui/NotFound";

const browserHistory = createBrowserHistory();
window.browserHistory = browserHistory;
let bhistory = window.browserHistory;

const unauthenticatedPages = ["/", "/signup"];
const authenticatedPages = ["/links"];

const onEnterPublicPage = (Component) => {
  if (Meteor.userId()) {
    return <Redirect to="/links" />
  } else {
    return <Component/>
  }
};

const onEnterPrivatePage = (Component) => {
  if (!Meteor.userId()) {
    return <Redirect to="/" />
  } else {
    return <Component/>
  }
};

const routes = (
  <Router history = {browserHistory}>
    <div>
      <Switch>
        <Route exact path="/" render={() => onEnterPublicPage(Login)}/>
        <Route exact path="/signup" render={() => onEnterPublicPage(Signup)}/>
        <Route exact path="/links" render={() => onEnterPrivatePage(Link)}/>
        <Route exact path="*" component={NotFound}/>
      </Switch>
    </div>
  </Router>
);

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const pathname = bhistory.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if(isAuthenticated == true && isUnauthenticatedPage){
    browserHistory.replace("/links");
  }
   else if(isAuthenticated == false && isAuthenticatedPage){
    browserHistory.replace("/");
  }
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById("app"));
});
