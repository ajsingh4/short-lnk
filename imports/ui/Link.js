import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {Accounts} from "meteor/accounts-base";

export default class Link extends React.Component {
  onLogout(){
    Accounts.logout();
  }
  render() {
    return (
      <div>
        <h1>Links Page</h1>
        <button onClick={this.onLogout.bind(this)}> Logout</button>
      </div>
    );
  }
}
