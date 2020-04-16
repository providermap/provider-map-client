import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";

// UI-Kit
import Text from "@airbnb/lunar/lib/components/Text";
import AppLoader from "@airbnb/lunar/lib/components/AppLoader";
import AdaptiveGrid from "@airbnb/lunar/lib/components/AdaptiveGrid";
import Select from "@airbnb/lunar/lib/components/Select";
import { Container, Div, Row, Col } from "ui-kit/components";

// Public components
import LocationProvider from "containers/LocationProvider";

// Private components
import FacilityCard from "containers/Facilities/All/components/FacilityCard";

// Utils
import { geofirestore } from "utils/firebase";
import { envPrefix } from "utils/environment";

// Hooks
import useGeoFirestoreQuery from "utils/hooks/useGeoFirestoreQuery";

// Definitions
import { facilityTypes, traumaTypes } from "containers/Facilities/All/definitions";

// Selectors
import { getLocation, getGeoLocation, getAreLocationServicesEnabled } from "containers/LocationProvider/store/locationProviderSelectors";


// Facility pagination size
const PAGE_SIZE = 20;

const AllFacilities = () => {

  // State values
  const { latitude, longitude } = useSelector(getLocation);
  const geoLocation = useSelector(getGeoLocation);
  const areLocationServicesEnabled = useSelector(getAreLocationServicesEnabled);

  // Initialize useForm hook for control inputs and handleSubmit handler
  const { control, watch } = useForm();

  // Base collection query
  let query = geofirestore.collection(`${envPrefix}_facilities`); //.orderBy("total_bed_count", "desc");

  // Watch facility type select dropdown value
  const facilityType = watch("facilityType") ?? null;
  const traumaType = watch("traumaType") ?? null;

  // Check filter types to add to base query
  if (facilityType && facilityType !== "All") {
    query = query.where("type", "==", facilityType);
  }
  if (traumaType && traumaType !== "All") {
    query = query.where("trauma", "==", traumaType);
  }

  if (areLocationServicesEnabled) {
    query = query.near({ center: geoLocation, radius: 10, limit: PAGE_SIZE });
  }

  const {
    items: facilities,
    isLoading,
    error,
  } = useGeoFirestoreQuery(query, PAGE_SIZE, { facilityType, traumaType, latitude, longitude });

  // Has facilities flag
  const hasFacilities = useMemo(() => (facilities?.length > 0), [facilities]);

  // Show loader flag
  const showLoader = useMemo(() => (isLoading || error), [isLoading, error]);

  return (
    <Container paddingBottom="10px">

      {/* Display location services banner */}
      <LocationProvider />

      <Div paddingY="30px">
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
              <Controller as={Select} control={control} name="facilityType" label="Facility Type" disabled={isLoading} small>
                { facilityTypes.map((facilityType) => <option key={facilityType} value={facilityType}>{ facilityType }</option>) }
              </Controller>
            </Col>
            <Col md="4">
              <Controller as={Select} control={control} name="traumaType" label="Trauma Type" disabled={isLoading} small>
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
                <AdaptiveGrid defaultItemsPerRow={1} breakpoints={{ "992": 2 }}>
                  {/* Map through facilities and display facility cards */}
                  { facilities?.map((facility) => <FacilityCard key={facility?.provider_id} facility={facility} /> )}
                </AdaptiveGrid>
              </Div>
            }
          </>
        }

      </Div>

    </Container>
  );
}

export default memo(AllFacilities);