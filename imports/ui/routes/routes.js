import {Meteor} from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, Switch, Redirect} from "react-router";
import {createBrowserHistory} from "history";

import Login from "../ui/Login";
import Signup from "../ui/Signup";
import Link from "../ui/Link";
import NotFound from "../ui/NotFound";

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

export const onAuthChange = (isAuthenticated) => {
  const pathname = bhistory.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if(isAuthenticated == true && isUnauthenticatedPage){
    browserHistory.replace("/links");
  }
   else if(isAuthenticated == false && isAuthenticatedPage){
    browserHistory.replace("/");
  }
}
export const routes = (
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
