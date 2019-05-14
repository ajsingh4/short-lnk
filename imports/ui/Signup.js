import React from "react";
import {Link} from "react-router-dom";

export default class Signup extends React.Component {
  render() {
    return(
      <div>
        <h1>This is my signup page</h1>
        Signup form
        <Link to="/"> Have an account? </Link>

      </div>
    );
  }
}
