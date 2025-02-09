"use server";
import { cookies } from "next/headers";
import { IUser } from "@/types/user";
import { z } from "zod";

export const GET_USER = async (): Promise<IUser | null> => {
  // Get the token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value; // Retrieve the token value
  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      "http://codecamp.accellware.com/api/Users/current/info",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Add the bearer token to the headers
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.statusText}`);
    }

    const user: IUser = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export interface IUserState {
  usernameState: string;
  fullnameState: string;
  emailState: string;
  passwordState: string;
  passwordRepeatState: string;
  status: number | null;
  message: string;
}

// Define the schema for email and password validation
const userSchema = z
  .object({
    email: z.string().email("Invalid email format"),
    username: z.string().min(1, "Username cannot be empty"),
    fullname: z.string().min(1, "Full name cannot be empty"),
    password: z.string().min(1, "Password cannot be empty"),
    passwordRepeat: z.string().min(1, "Confirm password cannot be empty"),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Password do not match",
    path: ["passwordRepeat"], // Attach the error to the `passwordRepeat` field
  });

// Signup function
export const PUT_USER = async (
  prevState: IUserState,
  formData: FormData
): Promise<IUserState> => {
  // Extract form data
  const email = formData.get("email")?.toString() ?? "";
  const username = formData.get("username")?.toString() ?? "";
  const fullName = formData.get("fullName")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const passwordRepeat = formData.get("passwordRepeat")?.toString() ?? "";

  // Validate inputs using the separate validation function
  const validationResult = validateUserInfo(
    email,
    username,
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
      "http://codecamp.accellware.com/api/Users/register", // *** not valid endpoint for Update User
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
      const usernameState = "";

      // Map API validation errors to the respective fields
      if (result.ValidationErrors) {
        if (result.ValidationErrors.Username) {
          emailState = result.ValidationErrors.Username.join(", ");
        }
      }

      // Return API errors
      return {
        emailState,
        usernameState,
        fullnameState,
        passwordState,
        passwordRepeatState,
        status: response.status,
        message: result.Messages?.[0] || "Faild to Update User",
      };
    }

    // Return success state
    return {
      emailState: "",
      usernameState: "",
      fullnameState: "",
      passwordState: "",
      passwordRepeatState: "",
      status: response.status,
      message: "Update successful!",
    };
  } catch (error) {
    // Handle network or server errors
    return {
      emailState: "",
      fullnameState: "",
      usernameState: "",
      passwordState: "",
      passwordRepeatState: "",
      status: null,
      message: `Update failed : ${(error as Error).message}`,
    };
  }
};

function validateUserInfo(
  email: string,
  username: string,
  fullname: string,
  password: string,
  passwordRepeat: string
): IUserState {
  // Validate inputs using zod
  const validation = userSchema.safeParse({
    email,
    username,
    fullname,
    password,
    passwordRepeat,
  });

  if (!validation.success) {
    // Initialize error states
    let emailState = "";
    let usernameState = "";
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
      } else if (err.path.includes("username")) {
        usernameState = err.message;
      }
    });

    // Return validation errors
    return {
      emailState,
      usernameState,
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
    usernameState: "",
    fullnameState: "",
    passwordState: "",
    passwordRepeatState: "",
    status: 200, // 200: Success
    message: "Validation successful.",
  };
}
