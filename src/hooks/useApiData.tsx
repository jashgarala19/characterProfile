import { useState, useCallback } from "react";
import { fetchData } from "services/apiService";
import { AxiosError } from "axios";

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
  }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchDataAndSetState = useCallback(
    async (queryParams?: object) => {
      setLoading(true);
      try {
        const result = await fetchData(endpoint, queryParams);
        console.log(result);
        setApiData(result);
        setError("");
      } catch (err) {
        if ((err as AxiosError)?.isAxiosError) {
          console.error(
            `API request error for ${endpoint} endpoint:`,
            (err as AxiosError).message
          );
          setError(
            (err as AxiosError).response?.data?.error || "Error fetching data"
          );
        } else {
          setError("Error fetching data");
        }
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
