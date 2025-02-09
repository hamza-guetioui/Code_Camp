"use client";
import { IRole } from "@/types/role";
import { useMemo, useReducer } from "react";

// Define types for the sorting state
export type SortStateTypes = {
  AlphaAsc: boolean;
  AlphaDesc: boolean;
};

export type SortActionTypes =
  | { type: "SET_ALPHA_ASC"; payload: boolean }
  | { type: "SET_ALPHA_DESC"; payload: boolean }
  | { type: "RESET_SORT"; payload: null };

export const initialState: SortStateTypes = {
  AlphaAsc: false,
  AlphaDesc: false,
};

// Reducer function to manage the sort state
export const reducer = (
  state: SortStateTypes,
  action: SortActionTypes
): SortStateTypes => {
  switch (action.type) {
    case "SET_ALPHA_ASC":
      return { ...state, AlphaAsc: action.payload, AlphaDesc: false };
    case "SET_ALPHA_DESC":
      return { ...state, AlphaDesc: action.payload, AlphaAsc: false };
    case "RESET_SORT":
      return { AlphaAsc: false, AlphaDesc: false };
    default:
      return state;
  }
};

// Custom hook to handle sorting logic
 const useSort = ({ data }: { data: IRole[] }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const result = useMemo(() => {
    if (!data) return [];

    if (state.AlphaAsc) {
      return [...data].sort((a, b) => a.role.localeCompare(b.role));
    }

    if (state.AlphaDesc) {
      return [...data].sort((a, b) => b.role.localeCompare(a.role));
    }

    return data;
  }, [data, state]); // Ensure `data` and `state` are dependencies

  return {
    state,
    dispatch,
    result,
  };
};

export default useSort;