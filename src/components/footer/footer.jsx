import React from "react";
import config from "../../services/config.json";

function Footer(props) {
  return <footer> &copy; 2022 - {config.siteName} </footer>;
}

export default Footer;
