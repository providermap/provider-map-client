import React, { memo } from "react";
import { createGlobalStyle } from "styled-components";


// Global styles
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0px;
    height: 100%;
  }

  body, #app {
    min-height: 100vh;
    margin: 0px !important;
    font-family: 'Muli', sans-serif;
  }

  #app {
    display: flex;
  }
`;

const GlobalStyles = () => (<GlobalStyle />);

export default memo(GlobalStyles);