"use client";
import { IUser } from "@/types/user";
import { useMemo, useReducer } from "react";

export type FilterStateTypes = {
  searchQuery: string;
};

export type FilterActionTypes = { type: "SET_SEARCH_QUERY"; payload: string };

export const initialState: FilterStateTypes = {
  searchQuery: "",
};

export const reducer = (
  state: FilterStateTypes,
  action: FilterActionTypes
): FilterStateTypes => {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
};

const useFilter = ({ data: users }: { data: IUser[] }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const result = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        !state.searchQuery ||
        user.fullName.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(state.searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [state, users]);

  return {
    state,
    dispatch,
    result,
  };
};

export default useFilter;

