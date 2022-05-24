import { Box, Link } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import userContext from "../../context/userContext";

function Navbar(props) {
  const user = useContext(userContext);
  const loggedIn = [
    ["Stores", "/stores"],
    ["Sections", "/sections"],
    ["Ingredients", "/ingredients"],
    ["Meals", "/meals"],
    ["Plans", "/plans"],
    ["Profile", "/profile"],
  ];

  const loggedOut = [
    ["Login", "/login"],
    ["Register", "/register"],
  ];
  if (user.loggedIn) {
    return (
      <React.Fragment>
        {loggedIn.map((item) => (
          <Link
            as={RouterLink}
            to={item[1]}
            key={item[0]}
            onClick={props.toggle}
          >
            <Box key={item[0]} borderWidth="1px" borderRadius="lg" p={4} m={1}>
              {item[0]}
            </Box>
          </Link>
        ))}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        {loggedOut.map((item) => (
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

export default Navbar;
