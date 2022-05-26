import { Box, Link } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import userContext from "../../context/userContext";
import { en } from "./../../services/textService";

function Navbar(props) {
  const user = useContext(userContext);
  const loggedIn = [
    [en.stores.titlePlural, "/stores"],
    [en.sections.titlePlural, "/sections"],
    [en.ingredients.titlePlural, "/ingredients"],
    [en.meals.titlePlural, "/meals"],
    [en.plans.titlePlural, "/plans"],
    [en.user.profile, "/profile"],
  ];

  const loggedOut = [
    [en.user.logIn, "/login"],
    [en.user.register, "/register"],
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
