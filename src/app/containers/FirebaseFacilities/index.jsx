import React, { memo } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Containers
import AllFacilities from "./All";

const Facilities = ({ match: { url }}) => (
  <Switch>
    <Route path={`${url}/all`} component={AllFacilities} />
    <Redirect to={`${url}/all`} />
  </Switch>
);

export default memo(Facilities);