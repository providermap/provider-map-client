import React from "react";
import { useHistory } from "react-router-dom" ;

// Public components
import Text from "@airbnb/lunar/lib/components/Text";
import AppLoader from "@airbnb/lunar/lib/components/AppLoader"
import AdaptiveGrid from "@airbnb/lunar/lib/components/AdaptiveGrid";
import Layout from "@airbnb/lunar-layouts/lib/components/Layout";
import Aside from "@airbnb/lunar-layouts/lib/components/Aside";
import { Div } from "../../../ui-kit/html";

// Private components
import FacilityCard from "./components/FacilityCard";

// Hooks
import useRequestHandler from "../../utils/hooks/useRequestHandler";

// Left aside
const LeftAside = () => (
  <Aside before width={300}>
    Filters will eventually go here :)
  </Aside>
);

const AllFacilities = () => {

  // Get history from react-router
  const { push } = useHistory();

  // Make API request via useRequestHandler hook
  const [ isReady, facilities, error ] = useRequestHandler(`/api/facility/all`);

  return (
    <AppLoader
      centered
      error={error}
      errorTitle="Please try again later. We apologize for the inconvenience."
      fetched={isReady}
      failureText="Failed to load facilities."
      loadingText="Loading facilities.">

      <Layout before={<LeftAside />}>
        <Div paddingBottom="20px" paddingLeft="10px">
          <Div fontSize="26px">Facilities&nbsp;&nbsp;</Div>
          <Text micro>({facilities?.length} results)</Text>
        </Div>

        <AdaptiveGrid defaultItemsPerRow={2}>
          {/* Map through facilities and display facility cards */}
          { facilities?.slice(1,10).map((facility) => <FacilityCard key={facility?.provider_id} push={push} facility={facility} /> )}
        </AdaptiveGrid>

      </Layout>
    </AppLoader>
  );
}

export default AllFacilities;