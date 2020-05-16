import { useLocation } from "react-router";


const useRouterQueryParams = () => {

  // Get location from react-router
  const location = useLocation();

  // Use the browser's built-in URLSearchParams API
  return new URLSearchParams(location?.search);
};

export default useRouterQueryParams;