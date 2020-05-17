import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

// Theme provider
import Theme from "ui-kit/theme";
import GlobalStyles from "ui-kit/global-styles";

// Containers
import ErrorBoundary from "containers/ErrorBoundary";
import Main from "containers/Main";

// Store configurations
import configureStore, { history } from "./store";
const store = configureStore();


const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ErrorBoundary>
        <GlobalStyles />
        <Theme>
          <Main />
        </Theme>
      </ErrorBoundary>
    </ConnectedRouter>
  </Provider>
);

export default App;