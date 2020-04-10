import { useState, useEffect, useCallback } from "react";


const useGeolocation = () => {

  // State management
  const [ position, setPosition ] = useState({ latitude: null, longitude: null });
  const [ error, setError ] = useState(null);

  // On location update callback
  const onLocationUpdate = useCallback(({ coords: { latitude, longitude  } }) => {

    // Update local state if location changed
    if (latitude !== position.latitude || longitude !== position.longitude) {
      setPosition({ latitude, longitude });
    }

  }, []);

  // On error callback
  const onError = useCallback((errorUpdate) => {

    // Update local state if error has changed
    if (errorUpdate !== error) {
      setError(error);
    }

  }, []);

  // On component mount, attempt to get user's location
  useEffect(() => {

    const geo = navigator.geolocation;

    if (!geo) {
      setError({ code: 4, message: "Geolocation is not supported" });
      return
    }

    // Set up a location watcher that performs a callback on location changes (caused by physical movement or increase in accuracy)
    const watchID = geo.watchPosition(onLocationUpdate, onError);

    // On component unmount, clear watcher
    return () => geo.clearWatch(watchID);
  }, []);

  return { ...position, error }
}

export default useGeolocation;
