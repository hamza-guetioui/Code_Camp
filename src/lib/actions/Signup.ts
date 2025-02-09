"use server";

import { z } from "zod";

export interface IFormState {
  emailState: string;
  passwordState: string;
  passwordRepeatState: string;
  fullnameState: string;
  status: number | null;
  message: string;
}

// Define the schema for email and password validation
const signupSchema = z
  .object({
    email: z.string().email("Invalid email format"),
    fullname: z.string().min(1, "Full name cannot be empty"),
    password: z.string().min(1, "Password cannot be empty"),
    passwordRepeat: z.string().min(1, "Confirm password cannot be empty"),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Passwords do not match",
    path: ["passwordRepeat"], // Attach the error to the `passwordRepeat` field
  });

// Signup function
export const SignUp = async (
  initialState: IFormState,
  formData: FormData
): Promise<IFormState> => {
  // Extract form data
  const email = formData.get("email")?.toString() ?? "";
  const fullName = formData.get("fullName")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const passwordRepeat = formData.get("passwordRepeat")?.toString() ?? "";

  //// If validation fails, return the validation result with error messages
  const validationResult = validateSignupInput(
    initialState,
    email,
    fullName,
    password,
    passwordRepeat
  );
  if (validationResult.status !== 200) return validationResult;

  try {
    // Send Signup request to the server
    const response = await fetch(
      "http://codecamp.accellware.com/api/Users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          fullName,
          password,
          passwordRepeat,
        }),
      }
    );

    // Parse the API response
    const result = await response.json();

    // Handle API errors
    if (!response.ok || !result?.IsSuccess) {
      // Map API validation errors to the respective fields
      if (result.ValidationErrors) {
        if (result.ValidationErrors.Username) {
          initialState.emailState = result.ValidationErrors.Username.join(", ");
        }
      }

      // Return API errors
      return {
        ...initialState,
        status: response.status,
        message: result.Messages?.[0] || "Signup failed. Please try again!",
      };
    }

    // Return success state
    return {
      ...initialState,
      status: response.status,
      message: "Signup successful!",
    };
  } catch (error) {
    // Handle network or server errors
    return {
      ...initialState,
      status: null,
      message: `Signup failed: ${(error as Error).message}`,
    };
  }
};

function validateSignupInput(
  initialState: IFormState,
  email: string,
  fullname: string,
  password: string,
  passwordRepeat: string
): IFormState {
  // Validate inputs using zod
  const validation = signupSchema.safeParse({
    email,
    fullname,
    password,
    passwordRepeat,
  });

  if (!validation.success) {
    // Map validation errors to the respective fields
    validation.error.errors.forEach((err) => {
      if (err.path.includes("email")) {
        initialState.emailState = err.message;
      } else if (err.path.includes("fullname")) {
        initialState.fullnameState = err.message;
      } else if (err.path.includes("password")) {
        initialState.passwordState = err.message;
      } else if (err.path.includes("passwordRepeat")) {
        initialState.passwordRepeatState = err.message;
      }
    });

    // Return validation errors
    return {
      ...initialState,
      status: 400, // Use 400 for validation errors
      message: "Validation failed. Please check your inputs.",
    };
  }
  // If validation is successful, return a success state
  return {
    ...initialState,
    status: 200, // 200: Success
    message: "Validation successful.",
  };
}
