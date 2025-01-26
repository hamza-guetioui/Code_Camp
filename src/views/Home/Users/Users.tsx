"use client";
import React, { useEffect } from "react";
import { useFetch } from "./Hooks/useFetch";
import { usePagination } from "./Hooks/usePagination";
import Container from "@/components/container";
import { useData } from "./dataContext";
import Image from "next/image";

const Users = () => {
  const { limit, loadMore } = usePagination(3); // Start with 10 users per page
  const { data, loading, error } = useFetch({ limit });
  const { displayData: users, handelData } = useData();

  useEffect(() => {
    if (data) {
      handelData(data);
    } else {
      handelData([]);
    }
  }, [handelData, data]);

  return (
    <Container className="w-full px-4 mt-4">
      {/* Table to display users */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              {/* <th className="py-3 px-4 border-b text-left">Picture</th> */}
              <th className="py-3 px-4 border-b text-left">Full Name</th>
              <th className="py-3 px-4 border-b text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <tr key={user.id} className="hover:bg-gray-50">
                  {/* <td className="py-3 px-4 border-b"> */}
                    {/* <Image
                      src={user.profilePicture ?? ""} // Replace with the actual field for the user's profile picture
                      alt={`${user.fullName}'s profile`}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </td> */}
                  <td className="py-3 px-4 border-b">{user.fullName}</td>
                  <td className="py-3 px-4 border-b">{user.username}</td>
                </tr>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination and Loading/Error States */}
      <Container className="py-8 text-center">
        {loading && <Loading />}
        {error && (
          <StateMessage
            message={`An error occurred: ${error || "Unable to load users."}`}
            color="red"
          />
        )}
        {!users || (users.length === 0 && !loading) ? (
          <StateMessage
            message="No users available at the moment."
            color="gray"
          />
        ) : (
          <button
            onClick={loadMore}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
  <div className="flex justify-center items-center mt-4 min-h-[24rem]">
    <p className={`text-${color}-500`}>{message}</p>
  </div>
);

// Loading Component
const Loading = () => (
  <div className="flex justify-center items-center mt-4 min-h-[24rem]">
    <div className="loader"></div>
  </div>
);
