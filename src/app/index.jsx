import React from "react";
// import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { Router, Route, Redirect, Switch } from "react-router";

// Components
import { Layout } from "./ui-kit/containers";

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
        <Layout>
          <Router history={history}>
            <Switch>
              <Route path="/facility" component={Facilities} />
              <Redirect to="/facility" />
            </Switch>
          </Router>
        </Layout>
    </Theme>
  </ErrorBoundary>
  // </Provider>
);

export default App;