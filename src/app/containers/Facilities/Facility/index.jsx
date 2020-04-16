import React, { memo, useCallback, useMemo } from "react";
import { useParams, useHistory } from "react-router-dom";

// Components
import Text from "@airbnb/lunar/lib/components/Text";
import AppLoader from "@airbnb/lunar/lib/components/AppLoader";
import Layout from "@airbnb/lunar-layouts/lib/components/Layout";
import Breadcrumbs, { Breadcrumb } from "@airbnb/lunar/lib/components/Breadcrumbs";
import { Term } from "@airbnb/lunar/lib/components/TermList";
import Link from "@airbnb/lunar/lib/components/Link";
import { Div, Container, Row, Col } from "ui-kit/components";

// Collections
import { facilitiesCollection } from "utils/collections";

// Hooks
import useGeoFirestoreQuery from "utils/hooks/useGeoFirestoreQuery";

// Query Classes
import { GeoFirestoreQuery } from "utils/QueryBuilder";


const Facility = () => {

  // Get route params
  const { providerId } = useParams();

  // Get push from history
  const { push } = useHistory();

  const query = useMemo(() => {

    // Build query to get single facility
    const firestoreQuery = new GeoFirestoreQuery(facilitiesCollection);

    // Add filter based on provider id
    firestoreQuery.AddFilter("provider_id", "==", Number(providerId));

    // Add limit of one result
    firestoreQuery.AddPageSize(1);

    return firestoreQuery;

  }, [providerId]);

  // Get document by providerId
  const { items, isLoading, error } = useGeoFirestoreQuery(query);

  // Get first item of data array
  const facility = useMemo(() => (items?.length > 0) ? items[0] : null, [items]);

  // Function to send user back to facilities page
  const pushToFacilities = useCallback(() => push(`/facility/all`), [push]);

  return (
    <AppLoader
      centered
      error={error}
      errorTitle="Please try again later. We apologize for the inconvenience."
      fetched={!isLoading}
      failureText="Failed to load facility."
      loadingText="Loading Facility">

      <Layout minHeight="360px" fluid>
        <Container paddingTop="10px">

          {/* Navigational Breadcrumbs */}
          <Div display="flex" _xs={{ justifyContent: "center" }} _sm={{ justifyContent: "center" }} _md={{ justifyContent: "flex-start" }}>
            <Breadcrumbs accessibilityLabel="Breadcrumb">
              <Breadcrumb label="Facilities" onClick={pushToFacilities} />
              <Breadcrumb highlighted selected hideIcon label={facility?.name ?? "Facility"} />
            </Breadcrumbs>
          </Div>

          <Div paddingY="30px" _xs={{ textAlign: "center" }} _sm={{ textAlign: "center" }} _md={{ textAlign: "left" }}>

            {/* Facility Name and Address */}
            <Div fontSize="30px">{ facility?.name }</Div>
            <Text muted> {`${facility?.address}, ${facility?.city} ${facility?.state} ${facility?.zip}`} </Text>

          </Div>

          <Row>
            <Col md="4" _xs={{ textAlign: "center" }} _sm={{ textAlign: "center" }} _md={{ textAlign: "left" }}>
              <Term label="Telephone">{ facility?.telephone || "--"}</Term>
            </Col>

            <Col md="4" _xs={{ marginY: "12px", textAlign: "center" }} _sm={{ marginY: "12px", textAlign: "center" }} _md={{ marginY: "0px", textAlign: "left" }}>
              <Term label="Beds">{ facility?.total_bed_count || "--" }</Term>
            </Col>

            <Col md="4" _xs={{ textAlign: "center" }} _sm={{ textAlign: "center" }} _md={{ textAlign: "left" }}>
              <Term label="ICU Beds">{ facility?.icu_bed_count || "--" }</Term>
            </Col>
          </Row>

          <Div paddingY="10px" />

          <Row>
            <Col md="4" _xs={{ textAlign: "center" }} _sm={{ textAlign: "center" }} _md={{ textAlign: "left" }}>
              {/* TODO: Field is missing from facility collection */}
              <Term label="Treats COVID-19">{ facility?.treats_covid19 || "Unknown" }</Term>
            </Col>

            <Col md="4" _xs={{ marginY: "12px", textAlign: "center" }} _sm={{ marginY: "12px", textAlign: "center" }} _md={{ marginY: "0px", textAlign: "left" }}>
              <Term label="Type">{ facility?.type }</Term>
            </Col>

            <Col md="4" _xs={{ textAlign: "center" }} _sm={{ textAlign: "center" }} _md={{ textAlign: "left" }}>
              <Term label="Last Updated">{ facility?.last_updated || "--" }</Term>
            </Col>
          </Row>
        </Container>
      </Layout>


      <Container marginTop="24px" textAlign="center">
        <Text>More information to come. Please reach out to <Link href="mailto:contact@providermap.org?subject=Contact the Provider Map Team">contact@providermap.org</Link>.</Text>
      </Container>
    </AppLoader>
  );
}

export default memo(Facility);