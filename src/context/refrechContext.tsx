"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { IFeature } from "@/types/feature";
import { useRefreshFetch } from "@/hooks/useRefreshFetch";

// Define the context type
interface RefreshContextTypes {
  refreshData: () => void;
  response: {
    data: IFeature[];
    loading: boolean;
    error: string | null;
  };
}

// Create the context with a default value of null
const RefreshContext = createContext<RefreshContextTypes | null>(null);

export const RefreshProvider = ({ children }: { children: React.ReactNode }) => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const response = useRefreshFetch({ refresh });

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }
  }, [refresh]);

  // Use useCallback to prevent unnecessary re-renders
  const refreshData = useCallback(() => setRefresh(true), []);

  return (
    <RefreshContext.Provider value={{ refreshData, response }}>
      {children}
    </RefreshContext.Provider>
  );
};

// Rename function to match its purpose
export const useRefresh = () => {
  const context = useContext(RefreshContext);
  if (!context) {
    throw new Error("useRefresh must be used within RefreshProvider");
  }
  return context;
};