import React from "react";
import { useHistory } from "react-router-dom" ;

// Public components
import Text from "@airbnb/lunar/lib/components/Text";
import AppLoader from "@airbnb/lunar/lib/components/AppLoader"
import Grid from "@airbnb/lunar/lib/components/Grid"
import { Layout } from "../../../ui-kit/containers";

// Private components
import FacilityCard from "./components/FacilityCard";

// Hooks
import useRequestHandler from "../../utils/hooks";


const AllFacilities = () => {

  // Get history from react-router
  const { push } = useHistory();

  // Make API request via useRequestHandler hook
  const [ isReady, facilities ] = useRequestHandler(`/api/facility/all`);

  if (isReady) return <AppLoader/>;

  return (
    <Layout>
      <Text>Facilities</Text>
      <Text bold>{`(${facilities?.length})`}</Text>

      <Grid>
        { facilities.slice(1,10).map((facility) => <FacilityCard key={facility?.provider_id} push={push} facility={facility} /> )}
      </Grid>

      {/* { JSON.stringify(facilities) } */}
    </Layout>
  );
}

export default AllFacilities;