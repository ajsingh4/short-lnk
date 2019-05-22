import {Meteor} from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, Switch} from "react-router";
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

const routes = (
  <Router history = {browserHistory}>
    <div>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/links" component={Link}/>
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
    browserHistory.push("/links");
  }
   else if(isAuthenticated == false && isAuthenticatedPage){
    browserHistory.push("/");
  }
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById("app"));
});
