import { Box, Container, HStack, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import config from "../../services/config.json";
import ToggleColour from "./toggleColour";
function Footer(props) {
  return (
    <footer>
      <Box h={50} pt={3}>
        <Container maxWidth="3xl">
          <HStack>
            <Text>&copy; 2022 - {config.siteName}</Text>
            <Spacer />
            <ToggleColour />
          </HStack>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;
