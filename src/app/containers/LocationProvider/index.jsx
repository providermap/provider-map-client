import React, { memo, useMemo, useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

// UI-Kit
import { Container } from "ui-kit/components";

// Action Creators
import { updateUserLocation } from "containers/LocationProvider/store/locationProviderActions";

// Components
import Toast from "@airbnb/lunar/lib/components/Toast";

// Hooks
import useGeolocation from "utils/hooks/useGeolocation";


const LocationProvider = () => {

  const dispatch = useDispatch();

  // Attempt to get current location of user
  const { latitude, longitude, error } = useGeolocation();

  // Set location updates in redux store
  useEffect(() => {

    // If location coordinates or error state have not changed, don't update values in redux store
    if (!latitude && !longitude && !error) return;

    dispatch(updateUserLocation(latitude, longitude, error));

  }, [latitude, longitude, error]);

  // Wait 2 seconds before allowing error banner to show (this gives the browser a chance to fetch user location)
  const [ canShowBanner, setCanShowBanner ] = useState(false);

  useEffect(() => void setTimeout(() => void setCanShowBanner(true), 2000), []);

  // Check if banner has been dismissed
  const [ hasBannerBeenDismissed, setHasBannerBeenDismissed ] = useState(false);

  const onBannerClose = useCallback(() => void setHasBannerBeenDismissed(true), []);

  // Find message to show in error banner
  const message = useMemo(() => {

    // If we receive an error code, get the appropriate language for the error banner
    switch (error?.code ?? null) {

      case 1:
        // Error code 1 -> location services permission denied
        return "For the best experience using Provider Map, please enable location services.";

      case 2:
          // Error code 2 -> general error
          return "Current location could not be found.";

      case 3:
        // Error code 3 -> timeout error
        return "Current location could not be found.";

      case 4:
        // Error code 4 -> location services not supported
        return "Location services are not supported on this browser. For the best experience using Provider Map, please use a different browser.";

    }

    // This condition should fire only after given time to receive location coordinates
    if (latitude === null && longitude === null) return "For the best experience using Provider Map, please enable location services.";

  }, [error, latitude, longitude]);

  // If there is an error or we are unable to fetch user location, show banner
  if (canShowBanner && message && !hasBannerBeenDismissed) {
    return (
      <Container>
        <Toast id="location-error-banner" message={message} onClose={onBannerClose} duration={0} delay={300} danger />
      </Container>
    );
  }

  return null;
}

export default memo(LocationProvider);