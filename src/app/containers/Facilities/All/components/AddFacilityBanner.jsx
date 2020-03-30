import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

// UI
import Card from "@airbnb/lunar/lib/components/Card";
import Button from "@airbnb/lunar/lib/components/Button";
import { Div } from "../../../../ui-kit/components";
import Text from "@airbnb/lunar/lib/components/Text";


const AddFacilityBanner = () => {

  // Get push from react-router
  const { push } = useHistory();

  // Create push function to navigate user to new facility page
  const pushToAddFacility = useCallback(() => push("/facility/add"), []);

  return (
    <Card>
      <Div display="flex" alignItems="center" justifyContent="space-between" padding="20px">
        <Div>
          <Text large>Help healthcare workers identify temporary medical facilities treating COVID-19.</Text>
          <Text muted>Many hospitals, hotels and buildings are being converted to provide services for COVID-19 patients. If you know of a facility not listed, please add it to our database for visibility.</Text>
        </Div>

        <Div width="160px" textAlign="right">
          <Button onClick={pushToAddFacility} small>Add Facility</Button>
        </Div>
      </Div>
    </Card>
  );
}

export default AddFacilityBanner;