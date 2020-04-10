import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Redirect, Switch } from "react-router";

// UI components
import { Div } from "../../ui-kit/components";

// Private components
import Navigation from "./components/Navigation";

// Prepare root router
const history = createBrowserHistory();

// Containers
import LocationProvider from "../LocationProvider";
import Facilities from "../Facilities";


const Main = () => (
  <Div width="100%">
    <Router history={history}>
      <Navigation />
      <LocationProvider />
      <Switch>
        <Route path="/facility" component={Facilities} />
        <Redirect to="/facility" />
      </Switch>
    </Router>
  </Div>
);

export default Main;