// Custom Exceptions
import InvalidParameterException from "utils/exceptions/InvalidParameterException";


const distanceCalculator = (latitude1, longitude1, latitude2, longitude2)  => {

  // Validate function parameters
  if (latitude1 < -90 || latitude1 > 90) {
    throw new InvalidParameterException("Invalid value passed for argument 'latitude1'.");
  }
  else if (latitude2 < -90 || latitude2 > 90) {
    throw new InvalidParameterException("Invalid value passed for argument 'latitude2'.");
  }
  else if (longitude1 < -180 || longitude1 > 180) {
    throw new InvalidParameterException("Invalid value passed for argument 'longitude1'.");
  }
  else if (longitude2 < -180 || longitude2 > 180) {
    throw new InvalidParameterException("Invalid value passed for argument 'longitude2'.");
  }

  // Short circuit if distance is 0
	if ((latitude1 == latitude2) && (longitude1 == longitude2)) return 0;

  // Calculate distance between to Lat/Lon points using the "Haversine formula"
  const radianLatitude1 = Math.PI * latitude1 / 180;
  const radianLatitude2 = Math.PI * latitude2 / 180;

  const theta = longitude1 - longitude2;

  const radianTheta = Math.PI * theta / 180;

  var dist = Math.sin(radianLatitude1) * Math.sin(radianLatitude2) + Math.cos(radianLatitude1) * Math.cos(radianLatitude2) * Math.cos(radianTheta);

  if (dist > 1) {
    dist = 1;
  }

  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;

  // Return distance in miles
  return dist;
}

export default distanceCalculator;