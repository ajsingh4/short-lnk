import React from "react";
import {BrowserRouter as Router} from "react-router-dom";

export default class Link extends React.Component {
  onLogout(){
    this.props.history.push("/");
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
