import React, { memo } from "react";

// UI Components
import Aside from "@airbnb/lunar-layouts/lib/components/Aside";
import Text from "@airbnb/lunar/lib/components/Text";
import { Div, Image, Flexbox } from "../../../../ui-kit/html";

// Images
import ProviderMapLogo from "../../../../assets/img/provider-map-logo.png";


// Left aside
const LeftAside = () => (
  <Aside before width={300}>
    <Flexbox justifyContent="center" alignItems="center">
      <Image src={ProviderMapLogo} height="60px" width="200px" />
    </Flexbox>

    <Div padding="10px 0 10px">
      <Text bold large>What is Provider Map?</Text>
    </Div>

    <Div>
      <Text>
        Provider Map collects information from nurses, physicians, and healthcare workers to provide the most comprehensive and up-to-date data on hospital capacity. We collect data about bed count, staffed beds, and verified staff from as many hospitals and temporary medical facilities as we can.
      </Text>
    </Div>

    <Div padding="20px 0 10px">
      <Text bold large>Why are we doing this?</Text>
    </Div>

    <Div paddingBottom="20px">
      <Text>
        This project is predicated on the rapid growth of COVID-19 patients globally. Unfortunately, the virus has found product-market fit and is scaling faster than our institutions’ response. We believe that the best way to reduce the load on our health system is by making accurate information available to the groups and individuals with the ability to make decisions. Right now, hospitals are dealing with their own resource and equipment needs. Our service works by removing the paywall that exists between provider data and healthcare workers.
      </Text>
    </Div>

    <Div>
      <Text>
        We encourage verified nurses and office workers to act as potential sources of information. Our project is directed at the people doing the work: the nurses, doctors, and ambulance drivers on the ground during this crisis. Our data is directed at whomever can use it to surface educated decisions: data scientists, statisticians, executives, and policy makers.
      </Text>
    </Div>
  </Aside>
);

export default memo(LeftAside);