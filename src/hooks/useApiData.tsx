import { useState, useCallback } from "react";
import { fetchData } from "services/apiService";

export interface ApiResponse {
  data?: {
    results?: object[];
  };
  error: string;
  loading: boolean;
  refetch: (queryParams?: object) => void;
}

const useApiData = (endpoint: string): ApiResponse => {
  const [apiData, setApiData] = useState<{
    results?: object[];
  }>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchDataAndSetState = useCallback(
    async (queryParams?: object) => {
      setLoading(true);
      try {
        const result = await fetchData(endpoint, queryParams);
        console.log(result);
        setApiData(result); // Set only the data property
        setError("");
      } catch (err) {
        if (err?.response?.data?.error) {
          setError(err?.response?.data?.error);
        } else {
          setError("Error fetching data");
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [endpoint]
  );

  const refetch = useCallback(
    (queryParams?: object) => {
      fetchDataAndSetState(queryParams);
    },
    [fetchDataAndSetState]
  );

  return {
    data: apiData,
    error,
    loading,
    refetch,
  };
};

export default useApiData;
