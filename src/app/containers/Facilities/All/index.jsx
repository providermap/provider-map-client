import React from "react";
import { useHistory } from "react-router-dom" ;

// Public components
import Text from "@airbnb/lunar/lib/components/Text";
import AppLoader from "@airbnb/lunar/lib/components/AppLoader"
// import Grid from "@airbnb/lunar/lib/components/Grid";
import Layout from "@airbnb/lunar-layouts/lib/components/Layout";
import Aside from "@airbnb/lunar-layouts/lib/components/Aside";
import { Div } from "../../../ui-kit/html";

// Private components
import FacilityCard from "./components/FacilityCard";

// Hooks
import useRequestHandler from "../../utils/hooks/useRequestHandler";

const AllFacilities = () => {

  // Get history from react-router
  const { push } = useHistory();

  // Make API request via useRequestHandler hook
  const [ isReady, facilities, error ] = useRequestHandler(`/api/facility/all`);
  console.log("AllFacilities -> isReady", isReady)

  const LeftAside = () => {
    return (
      <Aside
        before
        width={300}>
        Filters will eventually go here :)
      </Aside>
    );
  }

  return (
    <AppLoader
      centered
      error={error}
      errorTitle="Please try again later. We apologize for the inconvenience."
      fetched={isReady}
      failureText="Failed to load facilities."
      loadingText="Loading facilities.">

      <Layout before={<LeftAside />}>
        <Div display="flex" alignItems="center" paddingBottom="20px">
          <Text large>Facilities&nbsp;&nbsp;</Text>
          <Text small>({facilities?.length})</Text>
        </Div>

        {/* Map through facilities and display facility cards */}
        { facilities?.slice(1,10).map((facility) => <FacilityCard key={facility?.provider_id} push={push} facility={facility} /> )}

      </Layout>
    </AppLoader>
  );
}

export default AllFacilities;