"use server";
import { cookies } from "next/headers";

export const GET_USER_PICTURE = async (id: string): Promise<string | null> => {
  try {
    const response = await fetch(
      `http://codecamp.accellware.com/api/Documents/download/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch user picture: ${response.statusText}`);
    }

    const userPicture = await response.json();
    return userPicture;
  } catch (error) {
    console.error("Error fetching user picture:", error);
    return null;
  }
};

export const PUT_USER_PICTURE = async (
  fileName: string
): Promise<{ status: number | null; message: string }> => {
  // Get the token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value; // Retrieve the token value
  if (!token) {
    return { status: 500, message: "No token found in cookies." };
  }
  try {
    const response = await fetch(
      `http://codecamp.accellware.com/api/Documents/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Add the bearer token to the headers
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName: fileName }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to user user picture: ${response.statusText}`);
    }

    return { status: 200, message: "User picture updated successfully" };
  } catch (error) {
    const errorMessage = error as Error;
    return { status: 400, message: errorMessage.message };
  }
};
