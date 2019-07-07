import React from "react";
import {Meteor} from "meteor/meteor";
import {Accounts} from "meteor/accounts-base";
import PropTypes from 'prop-types';

export default class PrivateHeader extends React.Component {
  onLogout(){
    Accounts.logout();
  }
  render(){
    return(
      <div>
        <h1>{this.props.title}</h1>
        <button onClick={this.onLogout.bind(this)}> Logout</button>
      </div>
    );
  }
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
}
