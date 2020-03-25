import React, { useEffect, useState, useMemo } from "react";
import { useHistory } from "react-router-dom" ;

// Public components
import Text from "@airbnb/lunar/lib/components/Text";
import AppLoader from "@airbnb/lunar/lib/components/AppLoader"
import AdaptiveGrid from "@airbnb/lunar/lib/components/AdaptiveGrid";
import Layout from "@airbnb/lunar-layouts/lib/components/Layout";
import { Div } from "../../../ui-kit/html";

// Private components
import FacilityCard from "./components/FacilityCard";
import LeftAside from "./components/LeftAside";

// Firestore DB
import { db } from "../../../../firebase";



const AllFacilities = () => {

  // Get history from react-router
  const { push } = useHistory();

  const [ isReady, setIsReady ] = useState(false);
  const [ facilities, setFacilities ] = useState([]);
  const [ error, setError ] = useState(null);
  console.log("AllFacilities -> facilities", facilities)


  const fetchFacilities = async () => {
    try {
      const data = await db.collection("facilities_dev").orderBy("total_bed_count", "desc").limit(100).get();
      console.log("fetchFacilities -> data", data)

      setFacilities(data.docs.map((doc => doc.data())));
      setIsReady(true);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => void fetchFacilities(), []);

  // Has facilities flag
  const hasFacilities = useMemo(() => (facilities?.length > 0), [facilities]);

  return (
    <AppLoader
      centered
      error={error}
      errorTitle="Please try again later. We apologize for the inconvenience."
      fetched={isReady}
      failureText="Failed to load facilities."
      loadingText="Loading facilities.">

      {/* Display null state for no facilities */}
      { !hasFacilities &&
        <Layout>
          <Div height="400px" display="flex" alignItems="center" justifyContent="center">
            {/* Make this look better */}
            <Text>No Facilities. Please come back later.</Text>
          </Div>
        </Layout>
      }

      {/* Display facilities if they exist */}
      { hasFacilities &&
        <Layout before={<LeftAside />}>


          <Div paddingBottom="20px" paddingLeft="10px">
            <Div fontSize="26px">Facilities</Div>
            <Text micro>({facilities?.length} results)</Text>
          </Div>

          <AdaptiveGrid defaultItemsPerRow={2}>
            {/* Map through facilities and display facility cards */}
            { facilities?.map((facility) => <FacilityCard key={facility?.provider_id} push={push} facility={facility} /> )}
          </AdaptiveGrid>

        </Layout>
      }
    </AppLoader>
  );
}

export default AllFacilities;