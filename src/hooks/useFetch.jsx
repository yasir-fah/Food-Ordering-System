import { useEffect, useState } from "react";

// - 'Custom hook' function for fetch certain data
function useFetch(fetchFn) {
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      // Start to Fetch:
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    // Call the fetching function:
    fetchData();

    // return Information:
  }, [fetchFn]);
  
  return {
    fetchedData,
    isLoading,
    error,
  };
}

export default useFetch;
