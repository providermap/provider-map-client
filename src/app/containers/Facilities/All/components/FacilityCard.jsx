import React, { useCallback } from "react";

// Public components
import Text from "@airbnb/lunar/lib/components/Text";
import Card, { Content } from "@airbnb/lunar/lib/components/Card";
import { Col } from "@airbnb/lunar/lib/components/Grid"
import { Div } from "../../../../ui-kit/containers";
import { Flexbox } from "../../../..//ui-kit/flexbox";

// Private components
import ChevronRight from "./ChevronRight";


const FacilityCard = ({ push, facility }) => {

  // Facility data
  const { name, address, provider_id } = facility;

  // Function to push user to facility specific page
  const pushToFacility = useCallback(() => push(`/facility/provider/${provider_id}`), [provider_id]);

  return (
    <Col span={6}>
      <Div marginY="10px" width="100%">
        <Card>
          <Content truncated after={<ChevronRight/>} onClick={pushToFacility} >
            <Flexbox alignItems="center">
              <Div>
                <Text>{ name }</Text>
                <Text>{ address }</Text>
              </Div>
            </Flexbox>
          </Content>
        </Card>
      </Div>
    </Col>

  );

}

export default FacilityCard;