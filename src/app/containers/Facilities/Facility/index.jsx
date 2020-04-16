import React, { useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";

// Components
import Text from "@airbnb/lunar/lib/components/Text";
import AppLoader from "@airbnb/lunar/lib/components/AppLoader";
import Layout from "@airbnb/lunar-layouts/lib/components/Layout";
import Breadcrumbs, { Breadcrumb } from "@airbnb/lunar/lib/components/Breadcrumbs";
import { Term } from "@airbnb/lunar/lib/components/TermList";
import Link from "@airbnb/lunar/lib/components/Link";
import { Div, Container, Row, Col } from "ui-kit/components";

// Utils
import { geofirestore } from "utils/firebase";
import { envPrefix } from "utils/environment";

// Hooks
import useGeoFirestoreQuery from "utils/hooks/useGeoFirestoreQuery";


const Facility = () => {

  // Get route params
  const { providerId } = useParams();

  // Get push from history
  const { push } = useHistory();

  // Function to send user back to facilities page
  const pushToFacilities = useCallback(() => push(`/facility/all`), [push]);

  // Create query to get facility by providerId
  const query = geofirestore.collection(`${envPrefix}_facilities`).where("provider_id", "==", Number(providerId));

  // Get document by providerId
  const { items, isLoading, error } = useGeoFirestoreQuery(query, 1);

  // Get first item of data array
  const facility = items?.shift();

  return (
    <AppLoader
      centered
      error={error}
      errorTitle="Please try again later. We apologize for the inconvenience."
      fetched={!isLoading}
      failureText="Failed to load facilities."
      loadingText="Loading Facilities">

      <Layout minHeight="360px" fluid>
        <Container paddingTop="10px">
          <Breadcrumbs accessibilityLabel="Breadcrumb">
            <Breadcrumb label="Facilities" onClick={pushToFacilities} />
            <Breadcrumb highlighted selected hideIcon label={facility?.name ?? "Placeholder"} />
          </Breadcrumbs>


          <Div paddingY="30px">
            <Div fontSize="30px">{ facility?.name }</Div>
            <Text muted>
              {`${facility?.address}, ${facility?.city} ${facility?.state} ${facility?.zip}`}
            </Text>
          </Div>

          <Row>
            <Col col={4}>
              <Term label="Telephone">{ facility?.telephone || "--"}</Term>
            </Col>

            <Col col={4}>
              <Term label="Beds">{ facility?.total_bed_count || "--" }</Term>
            </Col>

            <Col col={4}>
              <Term label="ICU Beds">{ facility?.icu_bed_count || "--" }</Term>
            </Col>
          </Row>

          <Div paddingY="10px" />

          <Row>
            <Col col={4}>
              <Term label="Treats COVID-19">{ facility?.treats_covid19 || "Unknown" }</Term>
            </Col>

            <Col col={4}>
              <Term label="Type">{ facility?.type }</Term>
            </Col>

            <Col col={4}>
              <Term label="Last Updated">{ facility?.last_updated || "--" }</Term>
            </Col>
          </Row>
        </Container>
      </Layout>


      <Container paddingTop="100px" overflowWrap="break-word">
        <Text>More information to come. Please reach out to <Link href="mailto:contact@providermap.org?subject=Contact the Provider Map Team">contact@providermap.org</Link>.</Text>
      </Container>
    </AppLoader>
  );
}

export default Facility;