"use server";
import { IFeature } from "@/types/feature";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

const API_URL = "http://codecamp.accellware.com/api";

export const GET_FEATURES = async (): Promise<IFeature[] | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  try {
    const response = await fetch(`${API_URL}/Features`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['FEATURES_DATA'] }
    });

    if (!response.ok) {
      console.error(
        `Error fetching features: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const result: IFeature[] = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching features:", error);
    return null;
  }
};
export const GET_FEATURE = async (id: string): Promise<IFeature | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  try {
    const response = await fetch(`${API_URL}/Features/${id}/details`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
     
    });

    if (!response.ok) {
      console.error(
        `Error fetching features: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const result: IFeature = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching features:", error);
    return null;
  }
};

export interface IFormState {
  nameState: string;
  codeState: string;
  feature?: IFeature | null;
  status: number | null;
  message: string;
}
const Feature_Schema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  code: z.string().min(1, "Code cannot be empty"),
});

// POST_FEATURE: Creates a new Feature
export const POST_FEATURE = async (
  initialState: IFormState,
  payload: FormData
): Promise<IFormState> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { ...initialState, status: 401, message: "Unauthorized" };
  }

  // Extract form fields
  const name = payload.get("name")?.toString() ?? "";
  const code = payload.get("code")?.toString() ?? "";

  // Validate inputs
  const validationResult = featureValidate(initialState, name, code);
  if (validationResult.status !== 200)
    return { ...initialState, ...validationResult };

  try {
    const response = await fetch(`${API_URL}/Features`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, code }),
    });

    if (!response.ok) {
      console.error(
        `Error creating feature: ${response.status} ${response.statusText}`
      );
      revalidateTag('FEATURES_DATA')
      return {
        ...initialState,
        status: response.status,
        message: `Error creating feature: ${response.statusText}`,
      };
    }

    const result: IFeature = await response.json();
    return {
      ...initialState,
      feature: result,
      status: 200,
      message: "Feature created successfully",
    };
  } catch (error) {
    console.error("Error in POST_FEATURE:", error);
    return { ...initialState, status: 500, message: "Internal server error" };
  }
};

// PUT_FEATURE: Update a Feature by id
export const PUT_FEATURE = async (
  initialState: IFormState,
  payload: FormData
): Promise<IFormState> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return { ...initialState, status: 401, message: "Unauthorized" };
  }
  const id = payload.get("id")?.toString() ?? "";
  if (id == undefined) {
    return { ...initialState, status: 400, message: "Invalid id" };
  }
  // Extract name and code from form data

  const name = payload.get("name")?.toString() ?? "";
  const code = payload.get("code")?.toString() ?? "";

  // Validate form input
  const validationResult = featureValidate(initialState, name, code);
  if (validationResult.status !== 200) return validationResult;

  try {
    const response = await fetch(`${API_URL}/Features/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, name, code }),
    });

    if (!response.ok) {
      console.error(
        `Error updating feature: ${response.status} ${response.statusText}`
      );
      revalidateTag('FEATURES_DATA')
      return {
        ...initialState,
        status: response.status,
        message: `Error updating feature: ${response.statusText}`,
      };
    }

    const result: IFeature = await response.json();
    return {
      ...initialState,
      feature: result,
      status: 200,
      message: "Feature updated successfully",
    };
  } catch (error) {
    console.error("Error in PUT_FEATURE:", error);
    return { ...initialState, status: 500, message: "Internal server error" };
  }
};

// DELETE_FEATURE: delete feature by id
export interface IDeleteFormState {
  status: number | null;
  message: string;
}
export const DELETE_FEATURE = async (
  initialState: IDeleteFormState,
  payload: FormData
): Promise<IDeleteFormState> => {
  console.log("object");
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { status: 401, message: "Unauthorized" };
  }
  const id = payload.get("id")?.toString() ?? "";
  if (id == undefined) {
    return { status: 400, message: "Invalid id" };
  }

  try {
    const response = await fetch(`${API_URL}/Features/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      console.error(
        `Error deleting feature: ${response.status} ${response.statusText}`
      );
      revalidateTag('FEATURES_DATA')
      return {
        status: response.status,
        message: `Error: ${response.statusText}`,
      };
    }

    return { status: 200, message: "Feature deleted successfully" };
  } catch (error) {
    console.error("Error in DEL_FEATURE:", error);
    return { status: 500, message: "Internal server error" };
  }
};
function featureValidate(
  initialState: IFormState,
  name: string,
  code: string
): IFormState {
  const validation = Feature_Schema.safeParse({ name, code });

  if (!validation.success) {
    // Map validation errors to the respective fields
    validation.error.errors.forEach((err) => {
      if (err.path.includes("name")) {
        initialState.nameState = err.message;
      } else if (err.path.includes("code")) {
        initialState.codeState = err.message;
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
