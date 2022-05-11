import { Box, Divider, Heading } from "@chakra-ui/react";
import React, { Component } from "react";
import config from "../services/config.json";

class Hero extends Component {
  render() {
    return (
      <section>
        <header>
          <Heading as="h1">{config.siteName}</Heading>
          <Divider my={4} />
          <Heading as="h2">Welcome to the Site!</Heading>

          <Box borderWidth="1px" borderRadius="lg" p={4} my={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta
            congue imperdiet. Nunc tincidunt, velit in commodo congue, nisi mi
            laoreet tellus, et rhoncus ex urna eu mauris. Aliquam pulvinar massa
            est, id suscipit elit ornare non.
          </Box>
        </header>
      </section>
    );
  }
}

export default Hero;
