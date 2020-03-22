import React, { useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";

// Components
import Text from "@airbnb/lunar/lib/components/Text";
import AppLoader from "@airbnb/lunar/lib/components/AppLoader";
import Layout from "@airbnb/lunar-layouts/lib/components/Layout";
import Breadcrumbs, { Breadcrumb } from "@airbnb/lunar/lib/components/Breadcrumbs";
import { Term } from "@airbnb/lunar/lib/components/TermList";
import { Div, Container, Row, Col } from "../../../ui-kit/html";

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
  const [ isReady, facility, error ] = useRequestHandler(`/api/facility/provider/${providerId}`);

  return (
    <AppLoader
      centered
      error={error}
      errorTitle="Please try again later. We apologize for the inconvenience."
      fetched={isReady}
      failureText="Failed to load facility."
      loadingText="Loading facility.">

      <Layout minHeight="360px" fluid>
        <Container>
          <Breadcrumbs accessibilityLabel="Breadcrumb">
            <Breadcrumb label="Facilities" onClick={pushToFacilities} />
            <Breadcrumb highlighted selected hideIcon label={facility?.name} />
          </Breadcrumbs>


          <Div paddingY="30px">
            <Div fontSize="30px">{ facility?.name }</Div>
            <Text muted>
              {`${facility?.address}, ${facility?.city} ${facility?.state} ${facility?.zip}`}
            </Text>
          </Div>

          <Row>
            <Col col={4}>
              <Term label="Telephone">{ facility?.telephone ?? "--"}</Term>
            </Col>

            <Col col={4}>
              <Term label="Beds">{ facility?.bed_count }</Term>
            </Col>

            <Col col={4}>
              <Term label="Staffed Beds">{ facility?.bed_count }</Term>
            </Col>
          </Row>

          <Div paddingY="10px" />

          <Row>
            <Col col={4}>
              <Term label="Treats COVID-19">{ facility?.treats_covid19 ?? "Unknown" }</Term>
            </Col>

            <Col col={4}>
              <Term label="Type">{ facility?.type }</Term>
            </Col>

            <Col col={4}>
              <Term label="Last Updated">{ facility?.last_update }</Term>
            </Col>
          </Row>
        </Container>
      </Layout>


      <Container paddingTop="100px" overflowWrap="break-word">{ JSON.stringify(facility) }</Container>
    </AppLoader>
  );
}

export default Facility;