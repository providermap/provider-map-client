import React, { useMemo, useState } from "react";
import { useHistory } from "react-router-dom" ;

// Public components
import Text from "@airbnb/lunar/lib/components/Text";
import AppLoader from "@airbnb/lunar/lib/components/AppLoader"
import AdaptiveGrid from "@airbnb/lunar/lib/components/AdaptiveGrid";
import Button from "@airbnb/lunar/lib/components/Button";
import Chip from "@airbnb/lunar/lib/components/Chip";
import Card, { Content } from "@airbnb/lunar/lib/components/Card";
import { Container, Div } from "../../../ui-kit/components";

// Private components
import AddFacilityBanner from "./components/AddFacilityBanner";
import FacilityCard from "./components/FacilityCard";

// Firestore DB
import { db } from "../../../../firebase";

// Utils
import useFirestorePagination from "../../utils/hooks/useFirestorePagination";
// Definitions
import { facilityTypes } from "./definitions";


const AllFacilities = () => {

  // Get history from react-router
  const { push } = useHistory();

  // Base collection query
  let query = db.collection("facilities").orderBy("total_bed_count", "desc");

  // Filter state values
  const [ facilityType, setFacilityType ] = useState(null);
  const setFacilityTypeFilter = (_facilityType) => () => {
    // If clicking chip of existing filter, turn off facility type filter otherwise set facility type filter
    if (_facilityType === facilityType) {
      setFacilityType();
    } else {
      setFacilityType(_facilityType);
    }
  }

  // Check filter types to add to base query
  // if (facilityType) {
  //   query = query.where("type", "==", facilityType);
  // }

  const {
    loading,
    loadingMore,
    loadingError,
    loadingMoreError,
    hasMore,
    items,
    loadMore
  } = useFirestorePagination(query, 20);

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


      <Container paddingY="20px">

        {/* Display banner about adding new facilities */}
        <AddFacilityBanner/>

        {/* Display null state for no facilities */}
        { !hasFacilities &&
          <Div height="400px" display="flex" alignItems="center" justifyContent="center" paddingY="30px">
            {/* Make this look better */}
            <Text>No Facilities. Please come back later.</Text>
          </Div>
        }

        {/* Display facilities if they exist */}
        { hasFacilities &&
          <Div paddingY="20px">
            <Div paddingBottom="20px" paddingLeft="10px">
              <Div fontSize="26px">Facilities</Div>
              <Text micro>({facilities?.length} results)</Text>
            </Div>

            <Card>
              <Content middleAlign>
                <Div paddingBottom="8px">Filter By Facility Type</Div>
                <Div display="flex" alignItems="center" justifyContent="space-between">
                  {/* Map through facility type filter options and display chips */}
                  { facilityTypes.map((_facilityType) => (
                    <Chip key={_facilityType} active={_facilityType === facilityType} onClick={setFacilityTypeFilter(_facilityType)}>{ _facilityType }</Chip>
                  ))}
                </Div>
              </Content>
            </Card>

            <Div paddingY="5px" />

            <AdaptiveGrid defaultItemsPerRow={2}>
              {/* Map through facilities and display facility cards */}
              { facilities?.map((facility) => <FacilityCard key={facility?.provider_id} push={push} facility={facility} /> )}
            </AdaptiveGrid>

            <Div display="flex" justifyContent="center" alignItems="center" paddingY="20px">
              { hasMore && <Button onClick={loadMore} loading={loadingMore}>{ hasMore ? "More" : "All facilities loaded." }</Button> }
            </Div>
          </Div>
        }
      </Container>

    </AppLoader>
  );
}

export default AllFacilities;