import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom" ;

// Public components
import Text from "@airbnb/lunar/lib/components/Text";
import AppLoader from "@airbnb/lunar/lib/components/AppLoader"
import Grid from "@airbnb/lunar/lib/components/Grid"
import { Layout } from "../../../ui-kit/containers";

// Private components
import FacilityCard from "./components/FacilityCard";


const AllFacilities = () => {

  // Get history from react-router
  const { push } = useHistory();

  // Local state to store facilities
  const [ facilities, setFacilities ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

  // Async function to make API call for all facilities
  const fetchFacilities = async () => {
    // Make API call to get random person
    const facilitiesResponse = await axios("/api/facility/all");
    console.log("fetchFacilities -> facilitiesResponse", facilitiesResponse)

    // Set random person in local state
    setFacilities(facilitiesResponse?.data);

    // Set loading to false to show facilities
    setIsLoading(false);
  };

  // Call the fetch facilities async method on mount
  useEffect(() => void fetchFacilities(), []);

  if (isLoading) return <AppLoader/>;

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