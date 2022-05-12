import { Box, Flex, HStack, Spacer } from "@chakra-ui/react";
import React, { Fragment, useState } from "react";
import config from "../../services/config.json";
import MenuToggle from "./menuToggle";
import NavbarUser from "./navBarUser";

const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Fragment>
      <header>
        <nav>
          <Flex direction={{ base: "column", md: "row" }}>
            <Box borderWidth="1px" borderRadius="lg" p={4} m={1}>
              <HStack>
                <strong>{config.siteName}</strong>
                <Spacer />
                <MenuToggle toggle={toggle} isOpen={isOpen} />
              </HStack>
            </Box>
            <Spacer />
            <Box
              display={{ base: isOpen ? "block" : "none", md: "block" }}
              flexBasis={{ base: "100%", md: "auto" }}
            >
              <Flex direction={{ base: "column", md: "row" }}>
                <NavbarUser />
              </Flex>
            </Box>
          </Flex>
        </nav>
      </header>
    </Fragment>
  );
};
export default Navbar;
