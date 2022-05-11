import { Box, Link } from "@chakra-ui/react";
import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import UserContext from "../../context/userContext";

class Navbar extends Component {
  loggedIn = [
    ["Stores", "/stores"],
    ["Sections", "/sections"],
    ["Ingredients", "/ingredients"],
    ["Meals", "/meals"],
    ["Plans", "/plans"],
    ["Profile", "/profile"],
  ];

  loggedOut = [
    ["Login", "/login"],
    ["Register", "/register"],
  ];
  render() {
    if (this.context.loggedIn) {
      return (
        <React.Fragment>
          {this.loggedIn.map((item) => (
            <Link as={RouterLink} to={item[1]} key={item[0]}>
              <Box
                key={item[0]}
                borderWidth="1px"
                borderRadius="lg"
                p={4}
                m={1}
              >
                {item[0]}
              </Box>
            </Link>
          ))}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          {this.loggedOut.map((item) => (
            <Link as={RouterLink} to={item[1]} key={item[0]}>
              <Box borderWidth="1px" borderRadius="lg" p={4} m={1}>
                {item[0]}
              </Box>
            </Link>
          ))}
        </React.Fragment>
      );
    }
  }
}

Navbar.contextType = UserContext;

export default Navbar;
