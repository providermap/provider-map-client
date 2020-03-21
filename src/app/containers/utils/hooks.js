import { useEffect, useState } from "react";
import axios from "axios";


const useRequestHandler = (apiRoute) => {

  // Local state for loading and API response
  const [ response, setResponse ] = useState(null);
  const [ isReady, setIsReady ] = useState(true);

  // Async function to make API call
  const makeApiRequestAsync = async () => {

    // Make API call to get random person
    const response = await axios(apiRoute);
    console.log("makeApiRequestAsync -> response", response);

    // Set response data in state
    setResponse(response?.data);

    // Set loading flag to false in state
    setIsReady(false);
  };

  // Call the api making async method on mount
  useEffect(() => void makeApiRequestAsync(), []);


  // Return loading and response state values
  return [ isReady, response ];
}

export default useRequestHandler;