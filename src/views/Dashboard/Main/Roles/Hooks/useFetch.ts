import { useEffect, useState } from "react";
import { GET_ROLES } from "@/lib/actions/Roles";
import { IRole } from "@/types/role";

export const useFetch = ({ limit }: { limit: number }) => {
  const [data, setData] = useState<IRole[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Calculate offset based on existing data and limit
        const offset = data ? data.length : 0;

        // Fetch new data with applied limit and offset
        const response: IRole[] | null = await GET_ROLES({ limit, offset });
        if (response !== null) {
          setData((prevData) =>
            prevData ? [...prevData, ...response] : response
          );
        }
        // Combine existing data with new data
      } catch {
        setError("Failure loading users");
      }
      setLoading(false);
    };

    fetchData();
  }, [limit]); // Refetch data whenever 'limit' changes

  return {
    data,
    error,
    loading,
  };
};
