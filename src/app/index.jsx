import React from "react";

// Theme provider
import Theme from "ui-kit/theme";
import GlobalStyles from "ui-kit/global-styles";

// Containers
import ErrorBoundary from "containers/ErrorBoundary";
import Main from "containers/Main";

// Store configurations
import Store from "store";


const App = () => (
  <Store>
    <ErrorBoundary>
      <GlobalStyles />
      <Theme>
        <Main />
      </Theme>
    </ErrorBoundary>
  </Store>
);

export default App;