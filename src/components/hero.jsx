import { AspectRatio, Box, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
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

        <Box borderWidth="1px" p={4} my={4}>
          {en.hero.text}
        </Box>

        <AspectRatio borderWidth="1px" p={4} my={4} ratio={16 / 9}>
          <iframe
            title="Guide to using Mealworm"
            src="https://www.youtube.com/embed/BM_pXTGU57g"
          />
        </AspectRatio>
      </header>
    </section>
  );
}

export default Hero;
