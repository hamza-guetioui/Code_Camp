// GET_USER: Fetches data for a specific user based on the user ID
import { users } from "@/data/users";
import { IUser } from "@/types/user";

// GET_USERS: Fetches a limited set of users based on offset and limit
export const GET_USERS = async ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}): Promise<IUser[] | null> => {
  try {
    // Calculate the slice of data to return based on limit and offset
    const start = offset;
    const end = offset + limit;

    // Slice the users data based on the offset and limit
    const usersSlice = users.slice(start, end);

    // Return the sliced data (limited users)
    return usersSlice;
  } catch (error) {
    console.error("Error in GET_USERS:", error);
    return null;
  }
};

// // POST_USER: Creates a new user
// export const POST_USER = async (fotmData: FormData): Promise<IUser> => {
//   try {
//     const newUser = {
//       ...userData,
//       id: (users.length + 1).toString(),
//     };
//     users.push(newUser); // Assuming users is a mutable array
//     return newUser; // Return the created user
//   } catch (error) {
//     console.error("Error in POST_USER:", error);
//     throw error; // Propagate error if needed
//   }
// };

// PUT_USER: Updates an existing user
// export const PUT_USER = async (
//   userId: string,
//   updatedData: Partial<IUser>
// ): Promise<IUser | undefined> => {
//   try {
//     const userIndex = users.findIndex((u) => u.id === userId);
//     if (userIndex === -1) {
//       throw new Error("User not found");
//     }

//     // Ensure that updated data is applied and updatedAt is set
//     const updatedUser = {
//       ...users[userIndex],
//       ...updatedData,
//       updatedAt: new Date().toISOString(), // Update timestamp
//     };

//     // Update user in the array
//     users[userIndex] = updatedUser;
//     return updatedUser; // Return the updated user
//   } catch (error) {
//     console.error("Error in PUT_USER:", error);
//     throw error; // Propagate error if needed
//   }
// };

// // DEL_USER: Deletes a user by ID
// export const DEL_USER = async (userId: string): Promise<IUser | undefined> => {
//   try {
//     // Find and remove the user from the array
//     const userIndex = users.findIndex((u) => u.id === userId);
//     if (userIndex === -1) {
//       throw new Error("User not found");
//     }

//     const deletedUser = users.splice(userIndex, 1)[0]; // Remove user from array
//     return deletedUser; // Return deleted user data
//   } catch (error) {
//     console.error("Error in PUT_USER:", error);
//     throw error; // Propagate error if needed
//   }
// };
