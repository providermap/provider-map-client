import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

// Public components
import Text from "@airbnb/lunar/lib/components/Text";
import AppLoader from "@airbnb/lunar/lib/components/AppLoader";
import AdaptiveGrid from "@airbnb/lunar/lib/components/AdaptiveGrid";
import Button from "@airbnb/lunar/lib/components/Button";
import Select from "@airbnb/lunar/lib/components/Select";
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

  // Initialize useForm hook for control inputs and handleSubmit handler
  const { control, watch } = useForm();

  // Base collection query
  let query = db.collection("facilities").orderBy("total_bed_count", "desc");

  // Watch facility type select dropdown value
  const facilityType = watch("facilityType");
  const traumaType = watch("traumaType");

  // Check filter types to add to base query
  if (facilityType && facilityType !== "All") {
    query = query.where("type", "==", facilityType);
  }
  if (traumaType && traumaType !== "All") {
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

  // Show loader flag
  const showLoader = useMemo(() => (loading || loadingError), [loading, loadingError]);

  return (
    <Container paddingY="20px">

      {/* Display banner about adding new facilities */}
      <AddFacilityBanner/>

      <Div paddingY="20px">
        <Div paddingBottom="20px" paddingLeft="10px">
          <Row>
            <Col md="4" sm="12" display="flex" alignItems="flex-end">
              <Div display="flex" alignItems="center">
                <Div fontSize="26px" paddingRight="10px">Facilities</Div>
                <Text>({facilities?.length})</Text>
              </Div>
            </Col>

            <Col md="4" sm="12">
              <Controller as={Select} control={control} name="facilityType" label="Facility Type" small>
                { facilityTypes.map((facilityType) => <option key={facilityType} value={facilityType}>{ facilityType }</option>) }
              </Controller>
            </Col>
            <Col md="4" sm="12">
              <Controller as={Select} control={control} name="traumaType" label="Trauma Type" small>
                { traumaTypes.map((traumaType) => <option key={traumaType} value={traumaType}>{ traumaType }</option>) }
              </Controller>
            </Col>
          </Row>
        </Div>

        <Div paddingY="5px" />

        { showLoader &&
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