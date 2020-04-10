import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import firebase from "firebase/app";

// Public components
import Text from "@airbnb/lunar/lib/components/Text";
import AppLoader from "@airbnb/lunar/lib/components/AppLoader";
import AdaptiveGrid from "@airbnb/lunar/lib/components/AdaptiveGrid";
import Button from "@airbnb/lunar/lib/components/Button";
import Select from "@airbnb/lunar/lib/components/Select";
import { Container, Div, Row, Col } from "ui-kit/components";

// Private components
import AddFacilityBanner from "containers/Facilities/All/components/AddFacilityBanner";
import FacilityCard from "containers/Facilities/All/components/FacilityCard";

// Firestore DB
import { geofirestore } from "utils/firebase";

// Hooks
import usePaginatedFirestoreQuery from "utils/hooks/usePaginatedFirestoreQuery";

// Definitions
import { facilityTypes, traumaTypes } from "containers/Facilities/All/definitions";

// Selectors
import { getLocation, getAreLocationServicesEnabled } from "containers/LocationProvider/store/locationProviderSelectors";


const AllFacilities = () => {

  // State values
  const { latitude, longitude } = useSelector(getLocation);
  const areLocationServicesEnabled = useSelector(getAreLocationServicesEnabled);

  // Initialize useForm hook for control inputs and handleSubmit handler
  const { control, watch } = useForm();

  // Base collection query
  let query = geofirestore.collection("facilities_geopoint"); //.orderBy("total_bed_count", "desc");

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
  if (areLocationServicesEnabled) {
    console.log("Querying by location");
    query = query.near({ center: new firebase.firestore.GeoPoint(latitude, longitude), radius: 1000 });
  }

  const {
    items: facilities,
    isLoading,
    isLoadingMore,
    hasMore,
    error,
    loadMoreResults
  } = usePaginatedFirestoreQuery(query, 20, facilityType, traumaType);

  // Has facilities flag
  const hasFacilities = useMemo(() => (facilities?.length > 0), [facilities]);

  // Show loader flag
  const showLoader = useMemo(() => (isLoading || error), [isLoading, error]);

  return (
    <Container paddingY="20px">

      {/* Display banner about adding new facilities */}
      <AddFacilityBanner/>

      <Div paddingY="20px">
        <Div paddingBottom="20px" paddingLeft="10px">
          <Row>

            {/* Facilities Count */}
            <Col md="4" display="flex" alignItems="flex-end">
              <Div display="flex" alignItems="center">
                <Div fontSize="26px" paddingRight="10px">Facilities</Div>
                <Text>({facilities?.length})</Text>
              </Div>
            </Col>

            {/* Filters */}
            <Col md="4">
              <Controller as={Select} control={control} name="facilityType" label="Facility Type" small>
                { facilityTypes.map((facilityType) => <option key={facilityType} value={facilityType}>{ facilityType }</option>) }
              </Controller>
            </Col>
            <Col md="4">
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
            error={error}
            errorTitle="Please try again later. We apologize for the inconvenience."
            failureText="Failed to load facilities."
            loadingText="Loading facilities."
          />
        }

        { !isLoading &&
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
                  { facilities?.map((facility) => <FacilityCard key={facility?.provider_id} facility={facility} /> )}
                </AdaptiveGrid>

                <Div display="flex" justifyContent="center" alignItems="center" paddingY="20px">
                  { hasMore && <Button onClick={loadMoreResults} loading={isLoadingMore}>{ hasMore ? "More" : "All facilities loaded." }</Button> }
                </Div>
              </Div>
            }
          </>
        }

      </Div>

    </Container>
  );
}

export default memo(AllFacilities);