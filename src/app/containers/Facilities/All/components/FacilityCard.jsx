import React, { useCallback } from "react";

// Public components
import Text from "@airbnb/lunar/lib/components/Text";
import Card, { Content } from "@airbnb/lunar/lib/components/Card";
import Divider from "@airbnb/lunar/lib/components/Divider";
import Grid, { Col } from "@airbnb/lunar/lib/components/Grid";
import { Term } from "@airbnb/lunar/lib/components/TermList";
import Spacing from "@airbnb/lunar/lib/components/Spacing";
import Link from '@airbnb/lunar/lib/components/Link'
import { Div, Flexbox } from "../../../../ui-kit/html";

// Utils
import timeAgo from "../../../utils/timeAgo";

const FacilityCard = ({ push, facility }) => {

  // Facility data
  const {
    address,
    available_bed_count,
    bed_count,
    city,
    last_update,
    name,
    provider_id,
    telephone,
    trauma,
    type,
    state,
    verified,
    website,
    zip
  } = facility;

  // Function to push user to facility specific page
  const pushToFacility = useCallback(() => push(`/facility/provider/${provider_id}`), [provider_id]);

  return (
    <Div paddingY="10px">
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
                  <Text>Beds Available:</Text>
                  <Text>{ available_bed_count || "Data Needed"}</Text>
                </Div>

                { /* TODO: Add 'Verify Now' link for false case */ }
                { verified && <Text>Verified</Text> }
                { !verified && <Text>Not Verified.</Text> }
              </Flexbox>

              <Div>
                <Text>{`Last Updated:${timeAgo(last_update)}`}</Text>
              </Div>
            </Flexbox>
          </Flexbox>

          <Divider/>

          <Grid>
            <Col span={4}>
              <Term label="Telephone">{ telephone || "--"}</Term>
            </Col>

            <Col span={4}>
              <Term label="Beds">{ bed_count }</Term>
            </Col>

            <Col span={4}>
              {/* TODO: Change to appropriate data field when available */}
              <Term label="Staffed Beds">{ bed_count }</Term>
            </Col>
          </Grid>

          <Spacing vertical={1} />

          <Grid>
            <Col span={4}>
              <Term label="Website">
                <Link href={website} onClick={(event) => event.stopPropagation()}>{website}</Link>
              </Term>
            </Col>

            <Col span={4}>
              <Term label="Trauma">{ trauma }</Term>
            </Col>

            <Col span={4}>
              <Term label="Type">{ type }</Term>
            </Col>
          </Grid>
        </Content>
      </Card>
    </Div>

  );

}

export default FacilityCard;