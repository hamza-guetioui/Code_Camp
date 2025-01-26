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

  // Validate inputs using the separate validation function
  const validationResult = validateLoginInput(username, password);

  // If validation fails, return the validation result
  if (validationResult.status !== 200) {
    return validationResult;
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
    const result = await response.json();
    // Check if the response is successful
    if (!response.ok && !result.isSuccess) {
      return {
        usernameState: "",
        passwordState: "",
        status: 400,
        message: result.Messages[0],
      };
    }
    // Parse the JSON body

    console.log("Token:", result.token);
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

// Validation function
function validateLoginInput(username: string, password: string): IFormState {
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

  // If validation is successful, return a success state
  return {
    usernameState: "",
    passwordState: "",
    status: 200, // 200: Success
    message: "Validation successful.",
  };
}
