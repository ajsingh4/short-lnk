import React from "react";
import {Meteor} from "meteor/meteor";
import {Tracker} from "meteor/tracker";
import {Links} from "../api/links";
import LinksListItem from "./LinksListItem"
import {Session} from "meteor/session";

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }
  componentDidMount(){
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe("linksPub");
      const links = Links.find({
        visible: Session.get("showVisible")
      }).fetch();
      this.setState({links});
    });
  }
  componentWillUnmount() {
    this.linksTracker.stop();
  }
  renderLinksListItems() {
    if(this.state.links.length === 0) {
      return (
        <div className="item">
          <p className="item__status-message">No Links Found</p>
        </div>
      );
    }
    else {
      return this.state.links.map((link) => {
        //Can pass in one link object as this.props.link
        //Or individually as this.props.userID
        const shortUrl = Meteor.absoluteUrl(link._id);
        return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>
      });
    }
  }
  render() {
    return (
      <div>
        <div>
          {this.renderLinksListItems()}
        </div>
      </div>
    );
  }
};
