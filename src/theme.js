// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const config = { initialColorMode: "system" };

const colors = {};

const fonts = {
  heading: "system-ui, sans-serif",
  body: "system-ui, sans-serif",

  heading: "Montserrat, sans-serif",
  body: "Montserrat, sans-serif",

  heading: "Comfortaa, sans-serif",
  body: "Comfortaa, sans-serif",

  mono: "Menlo, monospace",
};

const components = {
  Link: { baseStyle: { _focus: { boxShadow: "none" } } },
  Button: { defaultProps: { borderLeftRadius: "0" } },
  Heading: {
    variants: {
      sectionHeader: (props) => ({
        bg: "purple.400",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        padding: 5,
        textShadow:
          props.colorMode === "dark" ? "0 0 0.5rem black" : "0 0 0.5rem white",
      }),
    },
  },
};

const theme = extendTheme({ config, fonts, colors, components });
export default theme;
