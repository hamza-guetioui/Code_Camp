"use client";
import { createContext, useCallback, useContext, useState } from "react";

import useFilter, {
  FilterStateTypes,
  FilterActionTypes,
} from "./Hooks/useFilter";
import useSort, { SortStateTypes, SortActionTypes } from "./Hooks/useSort";
import { IUser } from "@/types/user";
// Define the context type
interface DataContextTypes {
  displayData: IUser[];
  handelData: (newData: IUser[]) => void;
  filterState: FilterStateTypes;
  filterDispatch: React.Dispatch<FilterActionTypes>;
  sortState: SortStateTypes;
  sortDispatch: React.Dispatch<SortActionTypes>;
}

// Create the context with a default value of null
const dataContext = createContext<DataContextTypes | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<IUser[]>([]);
  const {
    state: filterState,
    dispatch: filterDispatch,
    result: filteredData,
  } = useFilter({ data });
  const {
    state: sortState,
    dispatch: sortDispatch,
    result: displayData,
  } = useSort({ data: filteredData });

  const handelData = useCallback((newData: IUser[]) => {
    setData(newData);
  }, []);

  // newData should return only one variable filter+sort in one or a leates one who combine the both

  return (
    <dataContext.Provider
      value={{
        displayData,
        handelData,
        filterState,
        sortState,
        filterDispatch,
        sortDispatch,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(dataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
