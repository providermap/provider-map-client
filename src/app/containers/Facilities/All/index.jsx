import React, { useMemo } from "react";
import { useHistory } from "react-router-dom" ;
import usePagination from "firestore-pagination-hook";

// Public components
import Text from "@airbnb/lunar/lib/components/Text";
import AppLoader from "@airbnb/lunar/lib/components/AppLoader"
import AdaptiveGrid from "@airbnb/lunar/lib/components/AdaptiveGrid";
import Button from "@airbnb/lunar/lib/components/Button";
import Layout from "@airbnb/lunar-layouts/lib/components/Layout";
import { Container, Div } from "../../../ui-kit/components";

// Private components
import FacilityCard from "./components/FacilityCard";

// Firestore DB
import { db } from "../../../../firebase";



const AllFacilities = () => {

  // Get history from react-router
  const { push } = useHistory();

  // Base collection query
  const query = db.collection("facilities").orderBy("total_bed_count", "desc");

  const {
    loading,
    loadingMore,
    loadingError,
    loadingMoreError,
    hasMore,
    items,
    loadMore
  } = usePagination(query, { limit: 20 } );

  // Convert document to facility data object
  const facilities = items.map((item => item.data()));

  // Has facilities flag
  const hasFacilities = useMemo(() => (facilities?.length > 0), [facilities]);

  return (
    <AppLoader
      centered
      error={loadingError || loadingMoreError}
      errorTitle="Please try again later. We apologize for the inconvenience."
      fetched={!loading}
      failureText="Failed to load facilities."
      loadingText="Loading facilities.">

      <Container fluid>
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
          <Layout>

            <Div paddingBottom="20px" paddingLeft="10px">
              <Div fontSize="26px">Facilities</Div>
              <Text micro>({facilities?.length} results)</Text>
            </Div>

            <AdaptiveGrid defaultItemsPerRow={2}>
              {/* Map through facilities and display facility cards */}
              { facilities?.map((facility) => <FacilityCard key={facility?.provider_id} push={push} facility={facility} /> )}
            </AdaptiveGrid>

            <Div display="flex" justifyContent="center" alignItems="center" paddingY="20px">
              { hasMore && <Button onClick={loadMore} loading={loadingMore}>{ hasMore ? "More" : "All facilities loaded." }</Button> }
            </Div>

          </Layout>
        }
      </Container>

    </AppLoader>
  );
}

export default AllFacilities;