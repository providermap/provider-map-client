import React, { useCallback } from "react";

// Public components
import Text from "@airbnb/lunar/lib/components/Text";
import Card, { Content } from "@airbnb/lunar/lib/components/Card";
import Divider from "@airbnb/lunar/lib/components/Divider";
import { Term } from "@airbnb/lunar/lib/components/TermList";
import Spacing from "@airbnb/lunar/lib/components/Spacing";
import Link from '@airbnb/lunar/lib/components/Link'
import { Div, Flexbox, Row, Col } from "../../../../ui-kit/components";

// Utils
import timeAgo from "../../../utils/timeAgo";


const FacilityCard = ({ push, facility }) => {

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
    zip
  } = facility;

  // Function to push user to facility specific page
  const pushToFacility = useCallback(() => push(`/facility/provider/${provider_id}`), [provider_id]);

  return (
    <Card>
      <Content truncated onClick={pushToFacility} >
        <Flexbox justifyContent="center" flexDirection="column">
          <Div paddingBottom="16px">
            <Text large>{ name }</Text>
            <Text muted>{`${address}, ${city} ${state} ${zip}`}</Text>
          </Div>

          <Flexbox justifyContent="space-between" alignItems="center" flexDirection="row">
            <Flexbox flexDirection="column">
              <Div display="inline-flex">
                <Text preserveWhitespace>Beds Available: </Text>
                <Text muted>{ available_bed_count || "Data Needed" }</Text>
              </Div>

              { /* TODO: Add 'Verify Now' link for false case */ }
              <Text>Verified: { verified ? "Yes" : <Link>Verify Now</Link> }</Text>
            </Flexbox>

            <Div>
              <Text muted>{`Last Updated: ${timeAgo(last_updated)}`}</Text>
            </Div>
          </Flexbox>
        </Flexbox>

        <Divider/>

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
              <Link href={website} onClick={(event) => event.stopPropagation()}>Visit Website</Link>
            </Term>
          </Col>

          <Col col={4}>
            <Term label="Trauma">{ trauma }</Term>
          </Col>

          <Col col={4}>
            <Term label="Type">{ type }</Term>
          </Col>
        </Row>
      </Content>
    </Card>
  );

}

export default FacilityCard;