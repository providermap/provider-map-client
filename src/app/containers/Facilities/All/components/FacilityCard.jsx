import React, { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";

// Public components
import Text from "@airbnb/lunar/lib/components/Text";
import Card, { Content } from "@airbnb/lunar/lib/components/Card";
import Divider from "@airbnb/lunar/lib/components/Divider";
import { Term } from "@airbnb/lunar/lib/components/TermList";
import Spacing from "@airbnb/lunar/lib/components/Spacing";
import Link from "@airbnb/lunar/lib/components/Link";
import { Div, Flexbox, Row, Col, Container } from "ui-kit/components";

// Selectors
import { getAreLocationServicesEnabled, getLocation } from "containers/LocationProvider/store/locationProviderSelectors";

// Utils
import timeAgo from "utils/timeAgo";
import distanceCalculator from "utils/distanceCalculator";


const FacilityCard = ({ facility }) => {

  // Facility data
  const {
    address,
    available_bed_count,
    city,
    last_updated,
    licensed_bed_count,
    name,
    provider_id,
    state,
    telephone,
    total_bed_count,
    trauma,
    type,
    ventilator_count,
    verified,
    website,
    zip,
    latitude: facilityLatitude,
    longitude: facilityLongitude
  } = facility;

  const dispatch = useDispatch();

  // Get values from redux store
  const areLocationServicesEnabled = useSelector(getAreLocationServicesEnabled);
  const { latitude: userLatitude, longitude: userLongitude } = useSelector(getLocation);


  // Find facility distance from user's current location (if user has location services enabled)
  const distance = useMemo(() => {

    // Short-circuit if user does not have location services enabled
    if (!areLocationServicesEnabled) return;

    // Get distance (in miles) from user's current location to facility
    return distanceCalculator(userLatitude, userLongitude, facilityLatitude, facilityLongitude);

  }, [areLocationServicesEnabled, facilityLatitude, facilityLongitude, userLatitude, userLongitude]);

  // Click handler to push user to facility specific page
  const pushToFacility = useCallback(() => void dispatch(push(`/facility/provider/${provider_id}`)), [provider_id]);

  // Click handler to stop event propagation
  const stopPropagation = useCallback((event) => event.stopPropagation(), []);

  return (
    <Card>
      <Content onClick={pushToFacility} truncated>

        <Flexbox justifyContent="center" flexDirection="column" minHeight="134px">
          <Div paddingBottom="16px">

            <Text large>{ name }</Text>
            <Text muted>{`${address}, ${city} ${state} ${zip}`}</Text>

            {/* If user's location services are enabled, show user's distance to facility */}
            { areLocationServicesEnabled && <Text small>{`${distance} Miles Away`}</Text> }

          </Div>

          <Flexbox justifyContent="space-between" alignItems="center" flexDirection="row">
            <Flexbox flexDirection="column">
              <Div display="inline-flex">
                <Text preserveWhitespace>Beds Available: </Text>
                <Text muted>{ available_bed_count || "Data Needed" }</Text>
              </Div>

              { /* TODO: Add 'Verify Now' link for false case */ }
              <Text>Verified: { verified ? "Yes" : <Link onClick={pushToFacility}>Verify Now</Link> }</Text>
            </Flexbox>

            <Div>
              <Text muted>{`Last Updated: ${timeAgo(last_updated)}`}</Text>
            </Div>
          </Flexbox>
        </Flexbox>

        <Divider/>

        <Container _lg={{ minHeight: "140px" }} _xl={{ minHeight: "120px" }} fluid>
          <Row>
            <Col col={4}>
              <Term label="Telephone">{ telephone || "--"}</Term>
            </Col>

            <Col col={4}>
              <Term label="Beds">{ total_bed_count || licensed_bed_count || "--" }</Term>
            </Col>

            <Col col={4}>
              <Term label="Ventilator Count">{ ventilator_count || "--" }</Term>
            </Col>
          </Row>

          <Spacing vertical={1} />

          <Row>
            <Col col={4}>
              <Term label="Website">
                <Link href={website} target="_blank" rel="noopener noreferrer" onClick={stopPropagation}>Visit Website</Link>
              </Term>
            </Col>

            <Col col={4}>
              <Term label="Trauma">{ trauma }</Term>
            </Col>

            <Col col={4}>
              <Term label="Type">{ type }</Term>
            </Col>
          </Row>
        </Container>
      </Content>
    </Card>
  );
}

export default memo(FacilityCard);