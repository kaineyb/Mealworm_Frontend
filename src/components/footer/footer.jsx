import { Box, Container, HStack, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { en } from "../../services/textService";
import ToggleColour from "./toggleColour";

function Footer(props) {
  return (
    <footer>
      <Box h={50} pt={3}>
        <Container maxWidth="3xl">
          <HStack>
            <Text>{en.copyright}</Text>
            <Spacer />
            <ToggleColour />
          </HStack>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;
