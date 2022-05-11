import { Box, Flex, Link, Spacer } from "@chakra-ui/react";
import React, { Component, Fragment } from "react";
import { Link as RouterLink } from "react-router-dom";
import config from "../../services/config.json";
import NavbarUser from "./navBarUser";

class Navbar extends Component {
  render() {
    return (
      <Fragment>
        <header>
          <Box mb={20}>
            <nav>
              <Flex>
                <Link as={RouterLink} to="/">
                  <Box borderWidth="1px" borderRadius="lg" p={4} m={1}>
                    <strong>{config.siteName}</strong>
                  </Box>
                </Link>

                <Spacer />
                <Flex>
                  <NavbarUser />
                </Flex>
              </Flex>
            </nav>
          </Box>
        </header>
      </Fragment>
    );
  }
}

export default Navbar;
