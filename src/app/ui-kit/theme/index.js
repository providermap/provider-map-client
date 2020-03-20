import React from "react";
import { ThemeProvider } from "styled-components";
import applyGroove from "styled-groove";

// Themes
import colors from "./colors";
import text from "./text";

// Custom application theme
const theme = {
  colors,
  text,
  applyGroove: (props) => applyGroove(props)
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    { children }
  </ThemeProvider>
);

export default Theme;