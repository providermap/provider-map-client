import React from "react";
// import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { Router } from "react-router";

// Store configurations
// import { configureStore } from "./store";

// Containers
import Home from "./containers/Home";

// prepare store
const history = createBrowserHistory();
// const store = configureStore();

const App = () => (
  // <Provider store={store}>
    <Router history={history}>
      <Home />
    </Router>
  // </Provider>
);

export default App;