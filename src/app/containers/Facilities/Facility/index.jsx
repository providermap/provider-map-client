import React from "react";
import { useParams } from "react-router-dom";

// Components
import Text from "@airbnb/lunar/lib/components/Text";
import AppLoader from "@airbnb/lunar/lib/components/AppLoader"
import { Layout } from "../../../ui-kit/containers";

// Hooks
import useRequestHandler from "../../utils/hooks";


const Facility = () => {

  // Get route params
  const { providerId } = useParams();

  // Make API request via useRequestHandler hook
  const [ isReady, data ] = useRequestHandler(`/api/facility/provider/${providerId}`);

  // Display app loader until component is ready
  if (isReady) return <AppLoader/>;

  return (
    <Layout>
      <Text>Specific Facility</Text>
      <Text>{ JSON.stringify(data) }</Text>
    </Layout>
  );
}

export default Facility;