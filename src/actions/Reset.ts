"use server";
import { z } from "zod";

export interface IReset {
  usernameState: string;
  status: number | null;
  message: string;
}
// Define the schema for username and password validation
const loginSchema = z.object({
  username: z.string().min(1, "Username cannot be empty"), // Ensures username is not empty
});

// Login function
export const reset = async (
  state: IReset,
  payload: FormData
): Promise<IReset> => {
  // Extract username and password from the form data
  const username = payload.get("username")?.toString() ?? "";
  // Validate inputs using zod
  const validation = loginSchema.safeParse({ username });

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
console.log(response);
    // Check if the response is successful
    if (!response.ok) {
      throw new Error(
        "faild to send verification code , please try again later."
      );
    }

    return {
      usernameState: "",

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
export interface IValidate {
  codeState: string; // Updated type from number to string for message handling
  status: number | null;
  message: string;
}

// Define the schema for code validation
const valideSchema = z.object({
  code: z.string().min(1, "Verification code cannot be empty"), // Ensures code is not empty
});

// Validation function
export const valide = async (
  state: IValidate,
  payload: FormData
): Promise<IValidate> => {
  // Extract code from the form data
  const code = payload.get("code")?.toString() ?? "";

  // Validate inputs using Zod
  const validation = valideSchema.safeParse({ code });

  if (!validation.success) {
    // Initialize error state
    let codeState = "";

    // Map validation errors to the respective fields
    validation.error.errors.forEach((err) => {
      if (err.path.includes("code")) {
        codeState = err.message; // Use the Zod validation error message
      }
    });

    // Return the error states and a general validation error message
    return {
      codeState,
      status: 400, // 400: Bad Request
      message: "The verification code is required. Please enter a valid code.",
    };
  }

  try {
    // Send verification code request to the server
    const response = await fetch(
      "http://codecamp.accellware.com/api/Users/password-reset",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({verificationCode: code }),
      }
    );
    console.log(response);
    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to send the verification code. Please try again later.");
    }

    return {
      codeState: "",
      status: 200, // Success
      message: "Verification code sent successfully. Please check your email.",
    };
  } catch (error) {
    // Handle network or server errors
    return {
      codeState: "",
      status: 500, // Internal Server Error
      message: `Failed to send the verification code: ${(error as Error).message}`,
    };
  }
};