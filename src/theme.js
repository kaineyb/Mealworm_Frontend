// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const config = { initialColorMode: "system" };

const colors = {};

const fonts = {
  body: "system-ui, sans-serif",
  heading: "system-ui, sans-serif",
  mono: "Menlo, monospace",
};

const components = {
  Table: {
    variants: {
      striped: {
        tr: {
          _odd: {
            background: "red.500",
            borderColor: "red.500",
            borderBottomWidth: 5,
          },
          _even: {
            background: "green.500",
            borderBottom: "green.500",
          },
        },
      },
    },
  },
};

const theme = extendTheme({ config, fonts, colors });
export default theme;
