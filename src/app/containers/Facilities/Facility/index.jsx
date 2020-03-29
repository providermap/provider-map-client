import React, { useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";

// Components
import Text from "@airbnb/lunar/lib/components/Text";
import AppLoader from "@airbnb/lunar/lib/components/AppLoader";
import Layout from "@airbnb/lunar-layouts/lib/components/Layout";
import Breadcrumbs, { Breadcrumb } from "@airbnb/lunar/lib/components/Breadcrumbs";
import { Term } from "@airbnb/lunar/lib/components/TermList";
import Link from "@airbnb/lunar/lib/components/Link";
import { Div, Container, Row, Col } from "../../../ui-kit/components";

// Firestore DB
import { db } from "../../../../firebase";


const Facility = () => {

  // Get route params
  const { providerId } = useParams();

  // Get push from history
  const { push } = useHistory();

  // Function to send user back to facilities page
  const pushToFacilities = useCallback(() => push(`/facility/all`), []);

  const query = db.collection("facilities").where("provider_id", "==", Number(providerId));

  const [ data, loading, error ] = useCollectionData(query);
  // Get first item of data array
  const facility = data?.shift();

  return (
    <AppLoader
      centered
      error={error}
      errorTitle="Please try again later. We apologize for the inconvenience."
      fetched={!loading && !!facility}
      failureText="Failed to load facility."
      loadingText="Loading facility.">

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