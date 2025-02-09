"use server";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export interface IFormState {
  status: number | null;
  message: string;
}

export const logoutAction = async () => {
  try {
    const cookieStore = await cookies();

    // Fetch existing cookies
    const tokenExists = cookieStore.has("token");
    const refreshTokenExists = cookieStore.has("refreshToken");

    if (!tokenExists && !refreshTokenExists) {
      return redirect("/login", RedirectType.replace);
    }

    // Delete cookies securely
    cookieStore.delete("token");
    cookieStore.delete("refreshToken");
  } catch {
    return {
      status: 400,
      message: "An error occurred while logging out. Please try again later.",
    };
  }

  // Ensure redirection happens even if there is an error
  return redirect("/login", RedirectType.replace);
};
