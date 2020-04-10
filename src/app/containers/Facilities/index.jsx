import React, { memo } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Containers
import AllFacilities from "./All";
import Facility from "./Facility";
import AddFacility from "./Add";


const Facilities = ({ match: { url } }) => (
  <Switch>
    <Route exact path={`${url}/all`} component={AllFacilities} />
    <Route exact path={`${url}/provider/:providerId(\\d+)`} component={Facility} />
    <Route exact path={`${url}/add`} component={AddFacility} />
    <Redirect to={`${url}/all`} />
  </Switch>
);

export default memo(Facilities);