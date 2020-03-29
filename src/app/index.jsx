import React from "react";
// import { Provider } from "react-redux";

// Theme provider
import Theme from "./ui-kit/theme";
import GlobalStyles from "./ui-kit/global-styles";

// Containers
import ErrorBoundary from "./containers/ErrorBoundary";
import Main from "./containers/Main";

// Store configurations
// import { configureStore } from "./store";
// const store = configureStore();


const App = () => (
  // <Provider store={store}>
  <ErrorBoundary>
    <GlobalStyles />
      <Theme>
        <Main />
    </Theme>
  </ErrorBoundary>
  // </Provider>
);

export default App;