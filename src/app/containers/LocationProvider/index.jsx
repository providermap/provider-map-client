import React, { memo, useMemo, useState, useEffect, useCallback } from "react";

// Components
import Toast from "@airbnb/lunar/lib/components/Toast";

// Hooks
import useGeolocation from "../utils/hooks/useGeolocation";


const LocationProvider = () => {

  // Get current location of user
  const { latitude, longitude, error } = useGeolocation();

  console.log("LocationProvider -> latitude, longitude, error", latitude, longitude, error)
  // TODO: Update latitude and longitude in redux store when it changes

  // Add a delay before showing banner (this gives the browser a chance to fetch user location)
  const [ canShowBanner, setCanShowBanner ] = useState(false);

  useEffect(() => {

    // Wait 2 seconds before allowing banner to show
    setTimeout(() => void setCanShowBanner(true), 2000);

  }, []);

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
        // Error code 3 -> timeout
        return "Current location could not be found.";

      case 4:
        // Error code 4 -> location services not supported
        return "Location services are not supported on this browser. For the best experience using Provider Map, please use a different browser.";

    }

    // This condition should fire only after given time to receive location coordinates
    if (latitude === null && longitude === null) return "For the best experience using Provider Map, please enable location services."

  }, [error, latitude, longitude]);

  // If there is an error or we are unable to fetch user location, show banner
  if (canShowBanner && message && !hasBannerBeenDismissed) {
    return (
      <Toast id="location-error-banner" message={message} onClose={onBannerClose} duration={0} delay={300} danger />
    );
  }

  return null;
}

export default memo(LocationProvider);