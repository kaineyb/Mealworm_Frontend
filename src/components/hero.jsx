import { Box, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import config from "../services/config.json";

function Hero(props) {
  useEffect(() => {
    document.title = `${config.siteName} - Welcome`;
  }, []);
  return (
    <section>
      <header>
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

export default Hero;
