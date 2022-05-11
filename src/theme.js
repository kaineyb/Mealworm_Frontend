// theme.js

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  colors: {
    brand: { 10: "#65d8af", 20: "#e8128c", 30: "#f8d545", 40: "#913abd" },
    gray: {
      50: "#F5EFEF",
      100: "#E4D3D3",
      200: "#D2B7B7",
      300: "#C19A9A",
      400: "#AF7E7E",
      500: "#9D6262",
      600: "#7E4E4E",
      700: "#5E3B3B",
      800: "#3F2727",
      900: "#1F1414",
    },
    orange: {
      50: "#FAF1EA",
      100: "#F1D9C5",
      200: "#E8C0A0",
      300: "#E0A77B",
      400: "#D78E56",
      500: "#CE7631",
      600: "#A55E27",
      700: "#7B471E",
      800: "#522F14",
      900: "#29180A",
    },
    green: {
      50: "#E6FFF2",
      100: "#B9FEDC",
      200: "#8CFDC5",
      300: "#5EFCAE",
      400: "#31FC97",
      500: "#04FB81",
      600: "#03C967",
      700: "#02974D",
      800: "#026433",
      900: "#01321A",
    },
  },

  initialColorMode: "dark",
  useSystemColorMode: true,
};

// 3. extend the theme
const theme = extendTheme({ config });

export default theme;
