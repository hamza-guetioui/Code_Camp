"use server";
import { z } from "zod";

export interface IReset {
  codeState: string; // Updated type from number to string for message handling
  passwordState: string;
  passwordRepeatState: string;
  status: number | null;
  message: string;
}

// Define the schema for code validation
const resetSchema = z
  .object({
    code: z.string().min(1, "Verification code cannot be empty"), // Ensures code is not empty
    password: z.string().min(1, "Password cannot be empty"),
    passwordRepeat: z.string().min(1, "Confirm password cannot be empty"),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Passwords do not match",
    path: ["passwordRepeat"], // Attach the error to the `passwordRepeat` field
  });

// Validation function
export const reset = async (
  state: IReset,
  payload: FormData
): Promise<IReset> => {
  // Extract code from the form data
  const code = payload.get("code")?.toString() ?? "";
  const username = payload.get("fullname")?.toString() ?? "";
  const password = payload.get("password")?.toString() ?? "";
  const passwordRepeat = payload.get("passwordRepeat")?.toString() ?? "";

  // Validate inputs using the separate validation function
  const validationResult = validateSignupInput(code, password, passwordRepeat);

  // If validation fails, return the validation result
  if (validationResult.status !== 200) {
    return validationResult;
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
        body: JSON.stringify({
          username,
          verificationCode: code,
          password,
          passwordRepeat,
        }),
      }
    );

    const result = await response.json();
    // Check if the response is successful
    if (!response.ok && !result.isSuccess) {
      return {
        codeState: "",
        passwordState: "",
        passwordRepeatState: "",
        status: 400,
        message:
          result.Messages[0] ||
          "Failed to reset password. Please try again later.",
      };
    }

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(
        "Failed to send the verification code. Please try again later."
      );
    }

    return {
      codeState: "",
      passwordState: "",
      passwordRepeatState: "",
      status: 200, // Success
      message: "password reset successfully ,please login",
    };
  } catch (error) {
    // Handle network or server errors
    return {
      codeState: "",
      passwordState: "",
      passwordRepeatState: "",
      status: 500, // Internal Server Error
      message: `Failed to send the verification code: ${
        (error as Error).message
      }`,
    };
  }
};

function validateSignupInput(
  code: string,
  password: string,
  passwordRepeat: string
): IReset {
  // Validate inputs using zod
  const validation = resetSchema.safeParse({
    code,
    password,
    passwordRepeat,
  });

  if (!validation.success) {
    // Initialize error states
    let codeState = "";
    let passwordState = "";
    let passwordRepeatState = "";

    // Map validation errors to the respective fields
    validation.error.errors.forEach((err) => {
      if (err.path.includes("code")) {
        codeState = err.message;
      } else if (err.path.includes("password")) {
        passwordState = err.message;
      } else if (err.path.includes("passwordRepeat")) {
        passwordRepeatState = err.message;
      }
    });

    // Return validation errors
    return {
      codeState,
      passwordState,
      passwordRepeatState,
      status: 400, // Use 400 for validation errors
      message: "Validation failed. Please check your inputs.",
    };
  }
  // If validation is successful, return a success state
  return {
    codeState: "",
    passwordState: "",
    passwordRepeatState: "",
    status: 200, // 200: Success
    message: "Validation successful.",
  };
}
