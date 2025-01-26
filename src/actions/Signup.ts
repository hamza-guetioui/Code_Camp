"use server";

import { z } from "zod";

export interface IFormState {
  emailState: string;
  passwordState: string;
  status: number | null;
  message: string;
  passwordRepeatState: string;
  fullnameState: string;
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
export const signup = async (
  prevState: IFormState,
  formData: FormData
): Promise<IFormState> => {
  // Extract form data
  const email = formData.get("email")?.toString() ?? "";
  const fullName = formData.get("fullName")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const passwordRepeat = formData.get("passwordRepeat")?.toString() ?? "";

  // Validate inputs using the separate validation function
  const validationResult = validateSignupInput(
    email,
    fullName,
    password,
    passwordRepeat
  );

  // If validation fails, return the validation result
  if (validationResult.status !== 200) {
    return validationResult;
  }

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
    if (!response.ok || !result.IsSuccess) {
      // Initialize error states
      let emailState = "";
      const fullnameState = "";
      const passwordState = "";
      const passwordRepeatState = "";

      // Map API validation errors to the respective fields
      if (result.ValidationErrors) {
        if (result.ValidationErrors.Username) {
          emailState = result.ValidationErrors.Username.join(", ");
        }
      }

      // Return API errors
      return {
        emailState,
        fullnameState,
        passwordState,
        passwordRepeatState,
        status: response.status,
        message: result.Messages?.[0] || "Signup failed. Please try again.",
      };
    }

    // Return success state
    return {
      emailState: "",
      fullnameState: "",
      passwordState: "",
      passwordRepeatState: "",
      status: response.status,
      message: "Signup successful!",
    };
  } catch (error) {
    // Handle network or server errors
    return {
      emailState: "",
      fullnameState: "",
      passwordState: "",
      passwordRepeatState: "",
      status: null,
      message: `Signup failed: ${(error as Error).message}`,
    };
  }
};

function validateSignupInput(
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
    // Initialize error states
    let emailState = "";
    let fullnameState = "";
    let passwordState = "";
    let passwordRepeatState = "";

    // Map validation errors to the respective fields
    validation.error.errors.forEach((err) => {
      if (err.path.includes("email")) {
        emailState = err.message;
      } else if (err.path.includes("fullname")) {
        fullnameState = err.message;
      } else if (err.path.includes("password")) {
        passwordState = err.message;
      } else if (err.path.includes("passwordRepeat")) {
        passwordRepeatState = err.message;
      }
    });

    // Return validation errors
    return {
      emailState,
      fullnameState,
      passwordState,
      passwordRepeatState,
      status: 400, // Use 400 for validation errors
      message: "Validation failed. Please check your inputs.",
    };
  }
  // If validation is successful, return a success state
  return {
    emailState: "",
    fullnameState: "",
    passwordState: "",
    passwordRepeatState: "",
    status: 200, // 200: Success
    message: "Validation successful.",
  };
}
