import React from "react";
// import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { Router } from "react-router";

// Theme provider
import Theme from "./ui-kit/theme";
import GlobalStyles from "./ui-kit/global-styles";

// Containers
import Home from "./containers/Home";
import ErrorBoundary from "./containers/ErrorBoundary";

// Store configurations
// import { configureStore } from "./store";
// const store = configureStore();

// Prepare root router
const history = createBrowserHistory();

const App = () => (
  // <Provider store={store}>
  <ErrorBoundary>
    <GlobalStyles />
      <Theme>
        <Router history={history}>
          <h1>Hey</h1>
          <Home />
        </Router>
    </Theme>
  </ErrorBoundary>
  // </Provider>
);

export default App;