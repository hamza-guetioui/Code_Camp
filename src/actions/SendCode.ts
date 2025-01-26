"use server";
import { z } from "zod";

export interface ISend {
  usernameState: string;
  username?: string;
  status: number | null;
  message: string;
}
// Define the schema for username and password validation
const sendSchema = z.object({
  username: z.string().min(1, "Username cannot be empty"), // Ensures username is not empty
});

// Login function
export const send = async (
  state: ISend,
  payload: FormData
): Promise<ISend> => {
  // Extract username and password from the form data
  const username = payload.get("username")?.toString() ?? "";

  // Validate inputs using zod
  const validation = sendSchema.safeParse({ username });

  if (!validation.success) {
    // Initialize error states
    let usernameState = "";

    // Map validation errors to the respective fields
    validation.error.errors.forEach((err) => {
      if (err.path.includes("username")) {
        usernameState = err.message;
      }
    });

    // Return the error states and a general message
    return {
      usernameState,
      status: 500, // 500: Validation error
      message: "Validation failed. Please check your inputs.",
    };
  }

  try {
    // Send login request to the server
    const response = await fetch(
      "http://codecamp.accellware.com/api/Users/password-reset/send-vertification-code",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      }
    );
   
    // Check if the response is successful
    if (!response.ok) {
      throw new Error(
        "faild to send verification code , please try again later."
      );
    }
    return {
      usernameState: "",
      username,
      status: 200,
      message: `Check your email for verification code`,
    };
  } catch (error) {
    // Handle network or server errors
    return {
      usernameState: "",
      status: 500,
      message: ` Faild to send verification code : ${(error as Error).message}`,
    };
  }
};
