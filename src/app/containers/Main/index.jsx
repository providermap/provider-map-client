import React, { memo } from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route, Redirect, Switch } from "react-router";

// UI components
import { Div } from "ui-kit/components";

// Private components
import Navigation from "containers/Main/components/Navigation";

// Prepare root router
import { history } from "store";

// Containers
import Facilities from "containers/Facilities";


const Main = () => (
  <Div width="100%">
    <ConnectedRouter history={history}>
      <Navigation />
      <Switch>
        <Route path="/facility" component={Facilities} />
        <Redirect to="/facility" />
      </Switch>
    </ConnectedRouter>
  </Div>
);

export default memo(Main);