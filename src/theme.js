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
  Link: { baseStyle: { _focus: { boxShadow: "none" } } },
};

const theme = extendTheme({ config, fonts, colors, components });
export default theme;
