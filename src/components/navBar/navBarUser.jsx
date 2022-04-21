import React, { Component } from "react";
import { Link } from "react-router-dom";

import UserContext from "../../context/userContext";

class Navbar extends Component {
  render() {
    if (this.context.loggedIn) {
      return (
        <React.Fragment>
          <li>
            <Link to="/stores">Stores</Link>
          </li>
          <li>
            <Link to="/sections">Sections</Link>
          </li>
          <li>
            <Link to="/ingredients">Ingredients</Link>
          </li>

          <li>
            <Link to="/meals">Meals</Link>
          </li>
          <li>
            <Link to="/plans">Plans</Link>
          </li>

          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </React.Fragment>
      );
    }
  }
}

Navbar.contextType = UserContext;

export default Navbar;
