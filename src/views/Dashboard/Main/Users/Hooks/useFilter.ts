"use client";
import { IUser } from "@/types/user";
import { useMemo, useReducer } from "react";

// Define the shape of the filter state
export type FilterStateTypes = {
  searchQuery: string; // The current search query for filtering users
};

// Define the action types for updating the filter state
export type FilterActionTypes = { type: "SET_SEARCH_QUERY"; payload: string };

// Initial state for the filter
export const initialState: FilterStateTypes = {
  searchQuery: "", // Start with an empty search query
};

// Reducer function to handle state updates based on actions
export const reducer = (
  state: FilterStateTypes,
  action: FilterActionTypes
): FilterStateTypes => {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      // Update the search query in the state
      return { ...state, searchQuery: action.payload };
    default:
      // Return the current state for unknown actions
      return state;
  }
};

// Custom hook to handle filtering logic
const useFilter = ({ data: users }: { data: IUser[] }) => {
  // Use useReducer to manage the filter state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Memoized result: Filter users based on the current search query
  const result = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        !state.searchQuery || // If no search query, include all users
        user.fullName.toLowerCase().includes(state.searchQuery.toLowerCase()) || // Match full name
        user.username.toLowerCase().includes(state.searchQuery.toLowerCase()); // Match username

      return matchesSearch;
    });
  }, [state, users]); // Re-run the filter when the state or users change

  return {
    state, // Current filter state (e.g., searchQuery)
    dispatch, // Function to update the filter state (e.g., set search query)
    result, // Filtered list of users
  };
};

export default useFilter;