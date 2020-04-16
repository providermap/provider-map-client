import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Redirect, Switch } from "react-router";

// UI components
import { Div } from "ui-kit/components";

// Private components
import Navigation from "containers/Main/components/Navigation";

// Prepare root router
const history = createBrowserHistory();

// Containers
import Facilities from "containers/Facilities";


const Main = () => (
  <Div width="100%">
    <Router history={history}>
      <Navigation />
      <Switch>
        <Route path="/facility" component={Facilities} />
        <Redirect to="/facility" />
      </Switch>
    </Router>
  </Div>
);

export default Main;