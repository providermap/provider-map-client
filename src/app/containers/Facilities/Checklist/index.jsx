import React, { memo } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Containers
import Start from "containers/Facilities/Checklist/components/Start";


const Checklist = ({ match: { url } }) => (
  <Switch>
    <Route exact path={`${url}/1`} component={Start} />
    <Redirect to={`${url}/1`} />
  </Switch>
);

export default memo(Checklist);