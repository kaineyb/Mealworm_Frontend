import {
  Box,
  Flex,
  HStack,
  Link,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { Fragment, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import config from "../../services/config.json";
import MenuToggle from "./menuToggle";
import NavbarUser from "./navBarUser";

const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const bg = useColorModeValue("gray.100", "whiteAlpha.200");
  const color = useColorModeValue("black", "white");

  return (
    <Fragment>
      <header>
        <nav>
          <Flex direction={{ base: "column", md: "row" }}>
            <HStack>
              <Link as={RouterLink} to="/" onClick={isOpen ? toggle : null}>
                <Box borderWidth="1px" p={4} my={1} _hover={{ bg: bg }}>
                  <Text>
                    <strong>{config.siteName}</strong>
                  </Text>
                </Box>
              </Link>
              <Spacer />
              <MenuToggle toggle={toggle} isOpen={isOpen} />
            </HStack>

            <Spacer />
            <Box
              display={{ base: isOpen ? "block" : "none", md: "block" }}
              flexBasis={{ base: "100%", md: "auto" }}
            >
              <Flex direction={{ base: "column", md: "row" }}>
                <NavbarUser toggle={toggle} />
              </Flex>
            </Box>
          </Flex>
        </nav>
        <Box mb={50}></Box>
      </header>
    </Fragment>
  );
};
export default Navbar;
