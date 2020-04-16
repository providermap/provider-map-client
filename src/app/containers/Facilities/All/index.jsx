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

// Hooks
import useGeoFirestoreQuery from "utils/hooks/useGeoFirestoreQuery";

// Definitions
import { facilityTypes, traumaTypes, distanceOptions, DEFAULT_PAGE_SIZE } from "containers/Facilities/All/definitions";

// Collections
import { facilitiesCollection } from "utils/collections";

// Selectors
import { getLocation, getGeoLocation, getAreLocationServicesEnabled } from "containers/LocationProvider/store/locationProviderSelectors";

// Query Classes
import { PaginatedFirestoreQuery, GeoFirestoreQuery } from "utils/QueryBuilder";


const AllFacilities = () => {

  // State values
  const { latitude, longitude } = useSelector(getLocation);
  const geoLocation = useSelector(getGeoLocation);
  const areLocationServicesEnabled = useSelector(getAreLocationServicesEnabled);

  // Initialize useForm hook for control inputs and handleSubmit handler
  const { control, watch } = useForm();

  // Watch facility type select dropdown value
  const facilityType = watch("facilityType") ?? null;
  const traumaType = watch("traumaType") ?? null;
  const distanceFromCurrentLocation = watch("distance") ?? null;

  const query = useMemo(() => {

    // Build query based on filter values and user location
    let firestoreQuery;

    // If location services are enabled, use a geo firestore query
    if (areLocationServicesEnabled) {
      firestoreQuery = new GeoFirestoreQuery(facilitiesCollection);
    }
    else {
      // If location services are not enabled, use a basic firestore query
      firestoreQuery = new PaginatedFirestoreQuery(facilitiesCollection);
    }

    // Add applied filters to query
    if (facilityType && facilityType !== "All") {
      firestoreQuery.AddFilter("type", "==", facilityType);
    }

    if (traumaType && traumaType !== "All") {
      firestoreQuery.AddFilter("trauma", "==", traumaType);
    }

    if (areLocationServicesEnabled && distanceFromCurrentLocation) {
      // Add distance filter if we are using a geo query
      firestoreQuery.AddDistanceFilter(geoLocation, Number(distanceFromCurrentLocation));
    }
    else {
      // Add pagination page size if we are using a normal firestore query
      firestoreQuery.AddPageSize(DEFAULT_PAGE_SIZE);
    }

    return firestoreQuery;

  }, [areLocationServicesEnabled, facilityType, traumaType, distanceFromCurrentLocation]);

  // Perform query
  const { items: facilities, isLoading, error, } = useGeoFirestoreQuery(query, { facilityType, traumaType, distanceFromCurrentLocation, latitude, longitude });

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

              {/* Facility Type Select Input */}
              <Controller as={Select} control={control} name="facilityType" label="Facility Type" disabled={isLoading} small>
                { facilityTypes.map((facilityType) => <option key={facilityType} value={facilityType}>{ facilityType }</option>) }
              </Controller>

            </Col>
            <Col md="4">

              {/* Trauma Type Select Input */}
              <Controller as={Select} control={control} name="traumaType" label="Trauma Type" disabled={isLoading} small>
                { traumaTypes.map((traumaType) => <option key={traumaType} value={traumaType}>{ traumaType }</option>) }
              </Controller>

            </Col>

            {/* Only show distance search if user we can get user location */}
            { areLocationServicesEnabled &&
              <Col>

                {/* Distance search option */}
                <Controller as={Select} control={control} name="distance" label="Search Distance" disabled={isLoading} defaultValue={"5"} small>
                  { distanceOptions.map((distanceValue) => <option key={distanceValue} value={distanceValue}>{ distanceValue }</option>) }
                </Controller>

              </Col>
            }

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
                  { facilities?.map((facility, index) => <FacilityCard key={index} facility={facility} /> )}
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