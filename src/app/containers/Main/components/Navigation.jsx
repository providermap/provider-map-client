import React, { memo, useCallback } from "react";
import { useHistory } from "react-router-dom";

// UI components
import { Flexbox, Image, Container } from "ui-kit/components";
import Text from "@airbnb/lunar/lib/components/Text";

// Images
import ProviderMapLogo from "assets/img/provider-map-logo.png";


const Navigation = () => {

  // Get push from react-router
  const { push } = useHistory();

  // Create function to push user back to home page
  const pushToHome = useCallback(() => push("/"), [push]);

  return (
    <Container backgroundColor="#eee" boxShadow="rgba(48,48,48,0.12) 0px 4px 16px" borderBottom="1px solid #ccc" fluid>
      <Container>

        <Flexbox width="100%" alignItems="center" justifyContent="space-between">
          <Image src={ProviderMapLogo} height="60px" width="200px" onClick={pushToHome} cursor="pointer" />
          <Text>COVID-19</Text>
        </Flexbox>

      </Container>
    </Container>
  );
}

export default memo(Navigation);