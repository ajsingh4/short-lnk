import React from "react";
import {Link} from "react-router-dom";

export default class Login extends React.Component {
  render() {
    return (
      <div>
        <h1>Login to short links</h1>
        login form here
        <Link to="/signup">Don't have an account?</Link>
      </div>
    );
  }
}
