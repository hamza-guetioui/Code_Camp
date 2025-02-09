"use client";
import React, { useEffect } from "react";
import { useFetch } from "./Hooks/useFetch";
import { usePagination } from "./Hooks/usePagination";
import Container from "@/components/container";
import { useData } from "./dataContext";
import User from "./User";

const Users = () => {
  // Pagination Logic: Start with 3 users per page and allow loading more
  const { limit, loadMore } = usePagination(3);

  // Fetch Data: Fetch users from the API based on the current limit
  const { data, loading, error } = useFetch({ limit });

  // Data Management: Store and manage the displayed users
  const { displayData: users, handleData } = useData();

  // Update Display Data: Whenever the fetched data changes, update the displayed users
  useEffect(() => {
    if (data) {
      handleData(data); // Update the displayed users with the fetched data
    } else {
      handleData([]); // If no data is fetched, clear the displayed users
    }
  }, [handleData, data]);

  return (
    <Container className={`w-full px-4`}>
      {/* Users Table: Display the list of users in a table */}
      <div className="overflow-x-auto rounded-lg ">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-700">
                Full Name
              </th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-700">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Map through the users and render each user using the `User` component */}
            {users?.map((user) => (
              <User key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination and Loading/Error States */}
      <Container className="py-8 text-center space-y-4">
        {/* Loading State: Show a spinner while data is being fetched */}
        {loading && <Loading />}

        {/* Error State: Display an error message if fetching fails */}
        {error && (
          <StateMessage
            message={`An error occurred: ${error || "Unable to load users."}`}
            color="red"
          />
        )}

        {/* Empty State: Show a message if no users are available */}
        {!users || (users.length === 0 && !loading) ? (
          <StateMessage
            message="No users available at the moment."
            color="gray"
          />
        ) : (
          // Load More Button: Allow users to load more data
          <button
            onClick={loadMore}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out"
          >
            Load More
          </button>
        )}
      </Container>
    </Container>
  );
};

export default Users;

// StateMessage Component
const StateMessage = ({
  message,
  color,
}: {
  message: string;
  color: string;
}) => (
  <div className={`flex justify-center items-center min-h-[24rem]`}>
    <p className={`text-${color}-500 text-lg`}>{message}</p>
  </div>
);

// Loading Component
const Loading = () => (
  <div className={`flex justify-center items-center`}>
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);
