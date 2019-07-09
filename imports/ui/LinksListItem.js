import React from "react";
import PropTypes from "prop-types";
import Clipboard from "clipboard";

export default class LinksListItem extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      justCopied: false
    };
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);
    this.clipboard.on("success", () => {
      this.setState({justCopied: true});
      setTimeout(() => this.setState({justCopied: false}), 1000);
    }).on("failure", () => {
      alert("Unable to copy");
    })
  }
  componentWillUnmount() {
    this.clipboard.destroy();
  }
  setButtonText(state){

  }
  render() {
    return (
      <div>
        <p>{this.props.url}</p>
        <p>{this.props.shortUrl}</p>
        <button ref="copy" data-clipboard-text={this.props.shortUrl}>{this.state.justCopied ? "Copied" : "Copy"}</button>
      </div>
    );
  }
};

LinksListItem.propTypes = {
  shortUrl: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
}
