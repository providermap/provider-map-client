import React, { memo, useCallback } from "react";
import { useHistory } from "react-router-dom";

// UI components
import { Flexbox, Image, Container } from "ui-kit/components";
// import Link from "@airbnb/lunar/lib/components/Link";

// Images
import ProviderMapLogo from "assets/img/provider-map-logo.png";


const Navigation = () => {

  // Get push from react-router
  const { push } = useHistory();

  // Create function to push user to home page & to add facility page
  const pushToHome = useCallback(() => push("/"), [push]);
  // const pushToAddFacility = useCallback(() => push("/facility/add"), [push]);

  return (
    <Container backgroundColor="#eee" boxShadow="rgba(48,48,48,0.12) 0px 4px 16px" borderBottom="1px solid #ccc" fluid>
      <Container>

        <Flexbox width="100%" alignItems="center" justifyContent="space-between">
          <Image src={ProviderMapLogo} height="60px" width="200px" onClick={pushToHome} cursor="pointer" />
          {/* <Link onClick={pushToAddFacility}>Add Facility</Link> */}
        </Flexbox>

      </Container>
    </Container>
  );
}

export default memo(Navigation);