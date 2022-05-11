// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const config = {
  useSystemColorMode: true,
};

const colours = {};

const fonts = {
  body: "system-ui, sans-serif",
  heading: "system-ui, sans-serif",
  mono: "Menlo, monospace",
};

const theme = extendTheme({ config, fonts });
export default theme;
