import React from "react";
// import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { Router, Route, Redirect, Switch } from "react-router";

// Components
import { Div } from "./ui-kit/html";

// Theme provider
import Theme from "./ui-kit/theme";
import GlobalStyles from "./ui-kit/global-styles";

// Containers
import Facilities from "./containers/Facilities";
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
        <Div width="100%">
          <Router history={history}>
            <Switch>
              <Route path="/facility" component={Facilities} />
              <Redirect to="/facility" />
            </Switch>
          </Router>
        </Div>
    </Theme>
  </ErrorBoundary>
  // </Provider>
);

export default App;