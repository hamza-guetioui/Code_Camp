"use client";
import React, { useEffect } from "react";
import { useFetch } from "./Hooks/useFetch";
import { usePagination } from "./Hooks/usePagination";
import Container from "@/components/container";
import { useData } from "./dataContext";
import Role from "./Role";

const Roles = () => {
  const { limit, loadMore } = usePagination(3); // Start with 3 roles per page
  const { data, loading, error } = useFetch({ limit });
  const { displayData: roles, handelData } = useData();

  useEffect(() => {
    if (data) {
      handelData(data);
    } else {
      handelData([]);
    }
  }, [handelData, data]);

  return (
    <Container className={`w-full px-4`}>
      {/* Table to display roles */}
      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-700">
                role
              </th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-700">
                p
              </th>
            </tr>
          </thead>
          <tbody>
            {roles?.map((role) => (
              <Role key={role.id} role={role} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination and Loading/Error States */}
      <Container className="py-8 text-center space-y-4">
        {loading && <Loading />}
        {error && (
          <StateMessage
            message={`An error occurred: ${error || "Unable to load roles."}`}
            color="red"
          />
        )}
        {!roles || (roles.length === 0 && !loading) ? (
          <StateMessage
            message="No roles available at the moment."
            color="gray"
          />
        ) : (
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

export default Roles;

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
