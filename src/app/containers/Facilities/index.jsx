import React, { memo } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Containers
import AllFacilities from "./All";
import Facility from "./Facility";

const Facilities = ({ match: { url }}) => (
  <Switch>
    <Route path={`${url}/all`} component={AllFacilities} />
    <Route path={`${url}/provider/:providerId`} component={Facility} />
    <Redirect to={`${url}/all`} />
  </Switch>
);

export default memo(Facilities);