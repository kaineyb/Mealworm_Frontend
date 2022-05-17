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
            {config.siteName} helps you organise your meals and meal plans, it
            generates a shopping list from your plans to help speed up making a
            shopping list :)
          </Box>
        </header>
      </section>
    );
  }
}

export default Hero;
