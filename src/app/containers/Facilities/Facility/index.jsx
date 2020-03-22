import React, { useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";

// Components
import Text from "@airbnb/lunar/lib/components/Text";
import AppLoader from "@airbnb/lunar/lib/components/AppLoader";
import Layout from "@airbnb/lunar-layouts/lib/components/Layout";
import Breadcrumbs, { Breadcrumb } from "@airbnb/lunar/lib/components/Breadcrumbs";
import Grid, { Col } from "@airbnb/lunar/lib/components/Grid";
import { Term } from "@airbnb/lunar/lib/components/TermList";
import { Div, } from "../../../ui-kit/html";

// Hooks
import useRequestHandler from "../../utils/hooks/useRequestHandler";


const Facility = () => {

  // Get route params
  const { providerId } = useParams();

  // Get push from history
  const { push } = useHistory();

  // Function to send user back to facilities page
  const pushToFacilities = useCallback(() => push(`/facility/all`), []);

  // Make API request via useRequestHandler hook
  const [ isReady, facility ] = useRequestHandler(`/api/facility/provider/${providerId}`);

  // Display app loader until component is ready
  if (!isReady) return <AppLoader/>;

  // Facility data
  const {
    address,
    bed_count,
    city,
    last_update,
    name,
    state,
    telephone,
    treats_covid19,
    type,
    zip
  } = facility;

  return (
    <Layout>
      <Breadcrumbs accessibilityLabel="Breadcrumb">
        <Breadcrumb label="Facilities" onClick={pushToFacilities} />
        <Breadcrumb highlighted selected hideIcon label={name} />
      </Breadcrumbs>


      <Div paddingY="20px">
        <Text>{ name }</Text>
        <Text>{`${address}, ${city} ${state} ${zip}`}</Text>
      </Div>

      <Grid>
        <Col span={4}>
          <Term label="Telephone">{ telephone || "--"}</Term>
        </Col>

        <Col span={4}>
          <Term label="Beds">{ bed_count }</Term>
        </Col>

        <Col span={4}>
          <Term label="Staffed Beds">{bed_count }</Term>
        </Col>
      </Grid>

      <Grid>
        <Col span={4}>
          <Term label="Treats COVID-19">{ treats_covid19 || "Unknown" }</Term>
        </Col>

        <Col span={4}>
          <Term label="Type">{ type }</Term>
        </Col>

        <Col span={4}>
          <Term label="Last Updated">{ last_update }</Term>
        </Col>
      </Grid>

      <Div paddingTop="100px">{ JSON.stringify(facility) }</Div>
    </Layout>
  );
}

export default Facility;