import React, { useEffect, memo, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { firestore } from "firebase/app";
import zipcodes from "zipcodes";
import * as yup from "yup";

// UI-Kit
import Text from "@airbnb/lunar/lib/components/Text";
import AppLoader from "@airbnb/lunar/lib/components/AppLoader";
import AdaptiveGrid from "@airbnb/lunar/lib/components/AdaptiveGrid";
import Select from "@airbnb/lunar/lib/components/Select";
import Input from "@airbnb/lunar/lib/components/Input";
import Button from "@airbnb/lunar/lib/components/Button";
// import Link from "@airbnb/lunar/lib/components/Link";
import { Container, Div, Row, Col, Form } from "ui-kit/components";

// Public components
import LocationProvider from "containers/LocationProvider";

// Private components
import FacilityCard from "containers/Facilities/All/components/FacilityCard";
import StartChecklistBanner from "containers/Facilities/All/components/StartChecklistBanner";

// Hooks
import useGeoFirestoreQuery from "utils/hooks/useGeoFirestoreQuery";
import useRouterQueryParams from "utils/hooks/useRouterQueryParams";

// Definitions
import { facilityTypes, traumaTypes, distanceOptions } from "containers/Facilities/All/definitions";

// Collections
import { facilitiesCollection } from "utils/collections";

// Selectors
import { getGeoLocation } from "containers/LocationProvider/store/locationProviderSelectors";

// Query Classes
import { GeoFirestoreQuery } from "utils/QueryBuilder";

// Facility search validation schema
const ValidationSchema = yup.object().shape({
  zip: yup.string().matches(/^[0-9]{5}$/, "Zip Code must be exactly 5 digits")
});


const AllFacilities = () => {

  // Get query params to check for default query values
  const queryParams = useRouterQueryParams();

  // On initial mount check if zip is provided via url query param and use it
  useEffect(() => {
    const zipQueryParam = queryParams.get("zip");

    // Use zip query param if available
    if (zipQueryParam && zipQueryParam !== zip) {
      setZipCoordinatesFromZip(zipQueryParam);
    }
  }, []);

  // State values
  const [ { zip,  zipLatitude, zipLongitude }, setZipCoordinates ] = useState({});
  const setZipCoordinatesFromZip = (zip) => {
    // Lookup zip code
    const zipLocation = zipcodes.lookup(zip);

    // Set zip latitude and longitude
    setZipCoordinates({ zip, zipLatitude: zipLocation?.latitude, zipLongitude: zipLocation?.longitude });
  }
  const geoZipLocation = useMemo(
    () => (zipLatitude && zipLongitude) ? new firestore.GeoPoint(zipLatitude, zipLongitude) : null,
    [zipLatitude, zipLongitude]
  );

  // Store values
  const geoLocation = useSelector(getGeoLocation);

  // Initialize useForm hook for control inputs and handleSubmit handler
  const { control, watch, handleSubmit, errors } = useForm({ validationSchema: ValidationSchema });

  // Set zip code in state on form submit
  const onSubmit = ({ zip }) => void setZipCoordinatesFromZip(zip);

  // Watch facility, trauma and distance from location type select dropdown value
  const facilityType = watch("facilityType") ?? null;
  const traumaType = watch("traumaType") ?? null;
  const distanceFromLocation = watch("distance") ?? null;

  // Flag to determine if facilities are ready to load (location lat & long are available)
  const isLocationAvailable = useMemo(
    () => ((!!geoLocation || !!geoZipLocation) && !!distanceFromLocation),
    [geoLocation, geoZipLocation, distanceFromLocation]
  );

  const query = useMemo(() => {

    // Build query based on filter values and user location
    let firestoreQuery;

    // If location services are enabled or zip was submitted, use a geo firestore query
    if (isLocationAvailable) {
      firestoreQuery = new GeoFirestoreQuery(facilitiesCollection);

      // Add applied filters to query
      if (facilityType && facilityType !== "All") {
        firestoreQuery.AddFilter("type", "==", facilityType);
      }

      if (traumaType && traumaType !== "All") {
        firestoreQuery.AddFilter("trauma", "==", traumaType);
      }

      // Add distance filter if we are using a geo query (filter by zip first, otherwise use geo from location services)
      firestoreQuery.AddDistanceFilter((geoZipLocation || geoLocation), Number(distanceFromLocation));
    }

    return firestoreQuery;

  }, [facilityType, traumaType, distanceFromLocation, isLocationAvailable, geoZipLocation, geoLocation]);

  // Perform query
  const {
    items: facilities,
    isLoading,
    error
  } = useGeoFirestoreQuery(
    query,
    isLocationAvailable,
    { facilityType, traumaType, distanceFromLocation, geoZipLocation, geoLocation }
  );

  // Has facilities flag
  const hasFacilities = useMemo(() => (facilities?.length > 0), [facilities]);

  // Show loader flag
  const showLoader = useMemo(() => (isLoading || error), [isLoading, error]);

  return (
    <Container paddingBottom="10px">

      {/* Display location services banner */}
      <LocationProvider />

      {/* Display start checklist call to action banner */}
      <StartChecklistBanner />

      <Div paddingY="30px">
        <Form onSubmit={handleSubmit(onSubmit)} paddingBottom="20px" paddingLeft="10px">
          <Row>

            {/* Facilities Count */}
            <Col md="4" display="flex" alignItems="center" justifyContent="flex-start">
              <Div display="flex" alignItems="center">
                <Div fontSize="26px" paddingRight="10px">Facilities</Div>
                <Text>({facilities?.length})</Text>
              </Div>
            </Col>

            {/* Filters */}
            <Col md="4" _xs={{ marginTop: "8px" }} _sm={{ marginTop: "8px" }} _md={{ marginTop: "0px" }}>

              {/* Facility Type Select Input */}
              <Controller as={Select} control={control} name="facilityType" label="Facility Type" disabled={isLoading || !isLocationAvailable} small>
                { facilityTypes.map((facilityType) => <option key={facilityType} value={facilityType}>{ facilityType }</option>) }
              </Controller>

            </Col>
            <Col md="4" _xs={{ marginTop: "8px" }} _sm={{ marginTop: "8px" }} _md={{ marginTop: "0px" }}>

              {/* Trauma Type Select Input */}
              <Controller as={Select} control={control} name="traumaType" label="Trauma Type" disabled={isLoading || !isLocationAvailable} small>
                { traumaTypes.map((traumaType) => <option key={traumaType} value={traumaType}>{ traumaType }</option>) }
              </Controller>

            </Col>
            <Col col="3" _xs={{ marginTop: "8px" }} _sm={{ marginTop: "8px" }}>

              {/* Distance search option */}
              <Controller as={Select} control={control} name="distance" label="Distance (Miles)" disabled={isLoading} defaultValue={"5"} small>
                { distanceOptions.map((distanceValue) => <option key={distanceValue} value={distanceValue}>{ distanceValue }</option>) }
              </Controller>

            </Col>

            <Col col="6" _xs={{ marginTop: "8px" }} _sm={{ marginTop: "8px" }}>
              <Controller
                as={Input}
                control={control}
                name="zip"
                label="Zip Code"
                // suffix={areLocationServicesEnabled && <Link onClick={() => {}}>Use Current Location</Link>}
                placeholder="Enter Zip Code"
                invalid={!!errors?.zip}
                errorMessage={errors?.zip?.message}
                disabled={isLoading}
                defaultValue={zip}
                small />
            </Col>

            <Col display="flex" alignItems="flex-end" justifyContent="flex-end" col="3" _xs={{ marginTop: "8px" }} _sm={{ marginTop: "8px" }}>
              <Button type="submit">Search</Button>
            </Col>
          </Row>
        </Form>

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

        { !isLocationAvailable &&
          <Div height="400px" display="flex" alignItems="center" justifyContent="center" paddingY="30px" textAlign="center">
            {/* Make this look better */}
            <Text bold>To search for nearby facilities, please input ZIP Code or enable browser location services.</Text>
          </Div>
        }

        { isLocationAvailable && !isLoading &&
          <>
            {/* Display null state for no facilities */}
            { !hasFacilities &&
              <Div height="400px" display="flex" alignItems="center" justifyContent="center" paddingY="30px" textAlign="center">
                {/* Make this look better */}
                <Text bold>No facilities found based on your search criteria.</Text>
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