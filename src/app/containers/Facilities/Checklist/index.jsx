import React, { memo } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Containers
import Start from "containers/Facilities/Checklist/components/Start";
import Step2 from "containers/Facilities/Checklist/components/Step2";
import Step3 from "containers/Facilities/Checklist/components/Step3";


const Checklist = ({ match: { url } }) => (
  <Switch>
    <Route exact path={`${url}/1`} component={Start} />
    <Route exact path={`${url}/2`} component={Step2} />
    <Route exact path={`${url}/3`} component={Step3} />
    <Redirect to={`${url}/1`} />
  </Switch>
);

export default memo(Checklist);