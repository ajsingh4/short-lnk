import React from "react";
import {BrowserRouter as Router} from "react-router-dom";

import {Links} from "../api/links";
import LinksList from "./LinksList";
import PrivateHeader from "./PrivateHeader";
import AddLink from "./AddLink";

export default () => {
  return (
    <div>
      <PrivateHeader title="Your links"/>
      <LinksList/>
      <AddLink/>
    </div>
  );
};
