import { Box, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import config from "../services/config.json";
import { en } from "../services/textService";

function Hero(props) {
  useEffect(() => {
    document.title = `${config.siteName} - Welcome`;
  }, []);
  return (
    <section>
      <header>
        <Heading as="h2">{en.hero.header}</Heading>

        <Box borderWidth="1px" borderRadius="lg" p={4} my={4}>
          {en.hero.text}
        </Box>
      </header>
    </section>
  );
}

export default Hero;
