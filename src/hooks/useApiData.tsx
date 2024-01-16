import { useEffect, useState, useCallback } from "react";
import { fetchData } from "services/apiService";

interface ApiResponse<T> {
  data: T | null;
  error: string;
  loading: boolean;
  refetch: () => void;
}

const useApiData = <T,>(
  endpoint: string,
  initialQueryParams: Record<string, any> = {}
): ApiResponse<T> => {
  const [apiData, setApiData] = useState<T | null>(null);
  // const [queryParams, setQueryParams] = useState(initialQueryParams);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchDataAndSetState = useCallback(
    async (queryParams) => {
      setLoading(true);
      try {
        const result = await fetchData<T>(endpoint, queryParams);
        console.log(result);
        setApiData(result);
        setError('');
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

  // useEffect(() => {
  //   fetchDataAndSetState();
  // }, [fetchDataAndSetState]);

  const refetch = useCallback(
    (queryParams) => {
      fetchDataAndSetState(queryParams);
    },
    [fetchDataAndSetState]
  );

  return {
    data: apiData!,
    error,
    loading,
    refetch,
  };
};

export default useApiData;
