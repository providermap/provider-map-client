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
import Card from '@airbnb/lunar/lib/components/Card'
import CardContent from "@airbnb/lunar/lib/components/Card/Content";
import MenuToggle from '@airbnb/lunar/lib/components/MenuToggle'
import MenuItem from "@airbnb/lunar/lib/components/Menu/Item"


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
  console.log(facility)
  return (
    <AppLoader
      centered
      error={error}
      errorTitle="Please try again later. We apologize for the inconvenience."
      fetched={!loading && !!facility}
      failureText="Failed to load facility."
      loadingText="Loading facility.">

      <Layout minHeight="400px" fluid> 
        <Container paddingTop="10px" >
          <Breadcrumbs accessibilityLabel="Breadcrumb">
            <Breadcrumb label="Facilities" onClick={pushToFacilities} />
            <Breadcrumb highlighted selected hideIcon label={facility?.name ?? "Placeholder"} />
          </Breadcrumbs>


          <Div paddingY="30px">
            <Row>
              <Col col={9}>
            <Div fontSize="30px">{ facility?.name }</Div>
            <Text muted>
              {`${facility?.address}, ${facility?.city} ${facility?.state} ${facility?.zip}`}
            </Text>
            </Col>
            <Col col={3}>
            <Card noPaddingBefore={true}>
              <CardContent >
                Available Beds<br/>
                {facility?.icu_bed_count / facility?.total_bed_count } | {facility?.icu_bed_count}
              </CardContent>
            </Card>
            </Col>
            </Row>
          </Div>

          <Row>
            <Col col={3}>
              <Term label="Telephone">{ facility?.telephone || "--"}</Term>
            </Col>

            <Col col={3}>
              <Term label="Beds">{ facility?.total_bed_count || "--" }</Term>
            </Col>

            <Col col={3}>
              <Term label="Staffed Beds">{ facility?.icu_bed_count || "--" }</Term>
            </Col>
            <Col col={3}>
            <Card maxHeight={20}>
              <CardContent >
                Do you work here? <a href="/">Verify now</a>
              </CardContent>
            </Card>
            </Col>
          </Row>

          <Div paddingY="10px" />

          <Row>
            <Col col={3}>
              <Term label="Treats COVID-19">{ facility?.treats_covid19 || "Unknown" }</Term>
            </Col>

            <Col col={3}>
              <Term label="Type">{ facility?.type }</Term>
            </Col>

            <Col col={3}>
              <Term label="Last Updated">{ facility?.last_updated || "--" }</Term>
            </Col>
            <Col col={3}>
            <MenuToggle
              accessibilityLabel="Add Information"
              toggleLabel="Add Information"
              zIndex={10}>
              <MenuItem onClick={console.log("hi")}>Item 1</MenuItem>
              <MenuItem onClick={console.log("hi")}>Item 2</MenuItem>
              <MenuItem onClick={console.log("hi")}>Item 3</MenuItem>
            </MenuToggle>
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