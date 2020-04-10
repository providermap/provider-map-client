import { useEffect, useState } from "react";
import axios from "axios";


const useRequestHandler = (apiRoute) => {

  // Local state for loading and API response
  const [ response, setResponse ] = useState(null);
  const [ isReady, setIsReady ] = useState(false);
  const [ error, setError ] = useState(error);

  // Async function to make API call
  const makeApiRequestAsync = async () => {
    try {

      // Make API call to get random person
      const response = await axios(apiRoute);
      // console.log("makeApiRequestAsync -> response", response);

      // Set response data in state
      setResponse(response?.data);

    } catch(error) {
      // Set error in state
      setError(error);
    } finally {
      // Set loading flag to true in state
      setIsReady(true);
    }
  };

  // Call the api making async method on mount
  useEffect(() => void makeApiRequestAsync(), []);

  // Return loading and response state values
  return [ isReady, response, error ];
}

export default useRequestHandler;