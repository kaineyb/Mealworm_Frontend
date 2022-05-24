import React, { useEffect } from "react";
import config from "../services/config.json";

function NotFound(props) {
  useEffect(() => {
    document.title = `${config.siteName} - 404 Not Found!`;
  }, []);
  return <h1>404 - Not Found!</h1>;
}

export default NotFound;
