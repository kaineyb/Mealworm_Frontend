import React, { Component } from "react";
import { Link } from "react-router-dom";

import config from "../../services/config.json";
import NavbarUser from "./navBarUser";

class Navbar extends Component {
  render() {
    return (
      <header>
        <nav>
          <Link to="/">{config.siteName}</Link>
          <ul>
            <NavbarUser />
          </ul>
        </nav>
      </header>
    );
  }
}

export default Navbar;
