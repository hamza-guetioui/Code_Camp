"use server";
import { z } from "zod";

export interface IFormState {
  usernameState: string;
  passwordState: string;
  status: number | null;
  message: string;
}
// Define the schema for username and password validation
const loginSchema = z.object({
  username: z.string().min(1, "Username cannot be empty"), // Ensures username is not empty
  // Ensures password is not empty, // Validates proper username format
  password: z.string().min(1, "Password cannot be empty"), // Ensures password is not empty// Minimum length
});

// Login function
export const login = async (
  state: IFormState,
  payload: FormData
): Promise<IFormState> => {
  // Extract username and password from the form data
  const username = payload.get("username")?.toString() ?? "";
  const password = payload.get("password")?.toString() ?? "";
  const rememberMe = payload.get("rememberMe") === "on";
  // Validate inputs using zod
  const validation = loginSchema.safeParse({ username, password });

  if (!validation.success) {
    // Initialize error states
    let usernameState = "";
    let passwordState = "";

    // Map validation errors to the respective fields
    validation.error.errors.forEach((err) => {
      if (err.path.includes("username")) {
        usernameState = err.message;
      } else if (err.path.includes("password")) {
        passwordState = err.message;
      }
    });

    // Return the error states and a general message
    return {
      usernameState,
      passwordState,
      status: 500, // 500: Validation error
      message: "Validation failed. Please check your inputs.",
    };
  }

  try {
    // Send login request to the server
    const response = await fetch(
      "http://codecamp.accellware.com/api/Users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, rememberMe }),
      }
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Login failed");
    }

    // Get the 'Set-Cookie' header
    const setCookieHeader = response.headers.get("Set-Cookie");

    // Define a regex to match the token
    const regex = /\.AspNetCore\.Identity\.Application=([^;]+)/;

    // Use RegExp.exec() to extract the token
    let token = "";
    if (setCookieHeader) {
      const match = regex.exec(setCookieHeader);
      if (match) {
        token = match[1]; // The token is in the first capturing group
      }
    }

    console.log("Token:", token);
    return {
      usernameState: "",
      passwordState: "",
      status: 200,
      message: `Login successful`,
    };
  } catch (error) {
    // Handle network or server errors
    return {
      usernameState: "",
      passwordState: "",
      status: 500,
      message: `Login failed: ${(error as Error).message}`,
    };
  }
};
