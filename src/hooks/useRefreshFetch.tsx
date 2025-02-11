import useSWR from "swr";
import { GET_FEATURES } from "@/lib/actions/Feature";
import { IFeature } from "@/types/feature";
import { useEffect } from "react";

const fetchFeatures = async (): Promise<IFeature[]> => {
  try {
    return (await GET_FEATURES()) ?? [];
  } catch {
    throw new Error("Failed to load features");
  }
};

export const useRefreshFetch = ({ refresh }: { refresh: boolean }) => {
  const { data, error, isLoading, mutate } = useSWR(
    "/features",
    fetchFeatures,
    {
      revalidateOnFocus: false, // Prevents refetching on window focus
      revalidateOnReconnect: false, // Prevents refetching when reconnecting
    }
  );

  // Manually refresh when `refresh` changes
  useEffect(() => {
    if (refresh) mutate();
  }, [refresh, mutate]);

  return {
    data: data ?? [],
    error: error?.message ?? null,
    loading: isLoading,
  };
};
