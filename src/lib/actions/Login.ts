"use server";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export interface IFormState {
  usernameState: string;
  passwordState: string;
  status: number | null;
  message: string;
}

// Define the schema for username and password validation
const loginSchema = z.object({
  username: z.string().min(1, "Username cannot be empty"),
  password: z.string().min(1, "Password cannot be empty"),
});

// Login function
export const loginAction = async (
  initialState: IFormState,
  payload: FormData
): Promise<IFormState> => {


  // Extract username and password from the form data
  const username = payload.get("username")?.toString() ?? "";
  const password = payload.get("password")?.toString() ?? "";
  const rememberMe = payload.get("rememberMe") === "on";

  // Validate inputs using the separate validation function
  const validationResult = validateLoginInput(initialState, username, password);
  if (validationResult.status !== 200) return validationResult;

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
    const errorMessage =
      result?.Messages?.[0] ?? "Failed to login, please try again!";
    // Check if the response is successful
    if (!response.ok) {
      return {
        ...initialState,
        status: 400,
        message: errorMessage,
      };
    }

    // Extract the token data from the API response
    const { token, refreshToken, tokenExpiry } = result;

    // Store the tokens in cookies using the helper function "setSession"
    const isSet = await setSession(token, refreshToken, tokenExpiry);
    if (!isSet)
      return {
        ...initialState,
        status: 400,
        message: "failed to login, please try again!",
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
  return redirect(`/dashboard`, RedirectType.push);
};

// Validation function
function validateLoginInput(
  initialState: IFormState,
  username: string,
  password: string
): IFormState {
  const validation = loginSchema.safeParse({ username, password });

  if (!validation.success) {
    // Map validation errors to the respective fields
    validation.error.errors.forEach((err) => {
      if (err.path.includes("username")) {
        initialState.usernameState = err.message;
      } else if (err.path.includes("password")) {
        initialState.passwordState = err.message;
      }
    });

    // Return the error states and a general message
    return {
      ...initialState,
      status: 400, // 400: Validation error
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

// Helper function to set the login session (store tokens in cookies/session)
async function setSession(
  token: string,
  refreshToken: string,
  tokenExpiry: number
) {
  try {
    const cookieStore = await cookies();

    // Set the access token in a secure HttpOnly cookie with expiration
    cookieStore.set("token", token, {
      // httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(tokenExpiry), // Set expiration time
      path: "/",
    });

    // Optionally, store the refresh token for token refreshing (without HttpOnly)
    cookieStore.set("refreshToken", refreshToken, {
      path: "/",
    });
    return true;
  } catch {
    return false;
  }
}
