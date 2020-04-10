import React from "react";
import { ThemeProvider } from "styled-components";
import applyGroove from "styled-groove";

// Themes
import colors from "ui-kit/theme/colors";
import text from "ui-kit/theme/text";

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