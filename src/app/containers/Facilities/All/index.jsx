import React, { useMemo, useState } from "react";
import { useHistory } from "react-router-dom" ;

// Public components
import Text from "@airbnb/lunar/lib/components/Text";
import AppLoader from "@airbnb/lunar/lib/components/AppLoader"
import AdaptiveGrid from "@airbnb/lunar/lib/components/AdaptiveGrid";
import Button from "@airbnb/lunar/lib/components/Button";
import Chip from "@airbnb/lunar/lib/components/Chip";
import Card, { Content } from "@airbnb/lunar/lib/components/Card";
import { Container, Div, Row, Col } from "../../../ui-kit/components";

// Private components
import AddFacilityBanner from "./components/AddFacilityBanner";
import FacilityCard from "./components/FacilityCard";

// Firestore DB
import { db } from "../../../../firebase";

// Utils
import usePaginatedFirestoreQuery from "../../utils/hooks/usePaginatedFirestoreQuery";

// Definitions
import { facilityTypes, traumaTypes } from "./definitions";


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

  const [ traumaType, setTraumaType ] = useState(null);
  const setTraumaTypeFilter = (_traumaType) => () => {
    // If clicking chip of existing filter, turn off facility type filter otherwise set facility type filter
    if (_traumaType === traumaType) {
      setTraumaType();
    } else {
      setTraumaType(_traumaType);
    }
  }

  // Check filter types to add to base query
  if (facilityType) {
    query = query.where("type", "==", facilityType);
  }
  if (traumaType) {
    query = query.where("trauma", "==", traumaType);
  }

  const {
    loading,
    loadingMore,
    loadingError,
    hasMore,
    items: facilities,
    loadMore,
  } = usePaginatedFirestoreQuery(query, 20, { facilityType, traumaType });

  // Has facilities flag
  const hasFacilities = useMemo(() => (facilities?.length > 0), [facilities]);

  return (
    <Container paddingY="20px">

      {/* Display banner about adding new facilities */}
      <AddFacilityBanner/>

      <Div paddingY="20px">
        <Div paddingBottom="20px" paddingLeft="10px">
          <Div fontSize="26px">Facilities</Div>
          <Text micro>({facilities?.length} results)</Text>
        </Div>

        <Row>
          <Col col="8">
            <Card>
              <Content middleAlign>
                <Div paddingBottom="8px">Filter Facilities By Trauma Center Level</Div>
                <Div display="flex" alignItems="center" justifyContent="space-between">
                  {/** Map through facility type filter options and display chips */}
                  { traumaTypes.map((_traumaType) =>
                    <Chip key={_traumaType} active={_traumaType === traumaType} onClick={setTraumaTypeFilter(_traumaType)}>{ _traumaType }</Chip>
                  )}
                </Div>
              </Content>
            </Card>
          </Col>

          <Col col="12" marginTop="10px">
            <Card>
              <Content middleAlign>
                <Div paddingBottom="8px">Filter By Facility Type</Div>
                <Div display="flex" alignItems="center" justifyContent="space-between">
                  {/** Map through facility type filter options and display chips */}
                  { facilityTypes.map((_facilityType) =>
                    <Chip key={_facilityType} active={_facilityType === facilityType} onClick={setFacilityTypeFilter(_facilityType)}>{ _facilityType }</Chip>
                  )}
                </Div>
              </Content>
            </Card>
          </Col>
        </Row>


        <Div paddingY="5px" />

        { loading || loadingError &&
          <AppLoader
            centered
            error={loadingError}
            errorTitle="Please try again later. We apologize for the inconvenience."
            failureText="Failed to load facilities."
            loadingText="Loading facilities."/>
        }

        { !loading &&
          <>
            {/* Display null state for no facilities */}
            { !hasFacilities &&
              <Div height="400px" display="flex" alignItems="center" justifyContent="center" paddingY="30px">
                {/* Make this look better */}
                <Text>No Facilities. Please come back later.</Text>
              </Div>
            }

            {/* Display facilities if they exist */}
            { hasFacilities &&
              <Div>
                <AdaptiveGrid defaultItemsPerRow={2}>
                  {/* Map through facilities and display facility cards */}
                  { facilities?.map((facility) => <FacilityCard key={facility?.provider_id} push={push} facility={facility} /> )}
                </AdaptiveGrid>

                <Div display="flex" justifyContent="center" alignItems="center" paddingY="20px">
                  { hasMore && <Button onClick={loadMore} loading={loadingMore}>{ hasMore ? "More" : "All facilities loaded." }</Button> }
                </Div>
              </Div>
            }
          </>
        }

      </Div>

    </Container>
  );
}

export default AllFacilities;