import { useEffect, useState } from "react";

const useFetchQuery = (query, params) => {
  const [fetcher, setFetcher] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const refetch = () => {
    setFetcher(true);
  };

  const fetchQuery = async () => {
    try {
      setLoading(true);
      if (!fetcher) setFetcher(true);
      const response = await query(params);
      setData(response?.data);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
      setFetcher(false);
    }
  };

  useEffect(() => {
    if (fetcher) fetchQuery();
  }, [fetcher]);

  useEffect(() => {
    fetchQuery();
  }, [params]);

  return {
    data,
    loading,
    error,
    refetch,
    setData,
  };
};

export default useFetchQuery;
