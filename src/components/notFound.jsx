import React, { useEffect } from "react";
import config from "../services/config.json";
import { en } from "./../services/textService";

function NotFound(props) {
  useEffect(() => {
    document.title = `${config.siteName} - ${en.error.notfound}`;
  }, []);
  return <h1>{en.error.notfound}</h1>;
}

export default NotFound;
