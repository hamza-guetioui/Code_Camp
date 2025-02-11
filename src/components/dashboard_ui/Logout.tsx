"use client";
import React from "react";
import Form from "next/form";
import { useFormState, useFormStatus } from "react-dom";
import SubmitButton from "@/components/form_ui/SubmitButton";
import FormStatePopup from "@/components/form_ui/FormStatePopup";
import { logoutAction, IFormState } from "@/lib/actions/Logout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

// Initial state for the form
const initialState: IFormState = {
  status: null,
  message: "",
};

const LogoutForm = () => {
  // useFormState hook to manage form state and actions
  const [state, formAction] = useFormState<IFormState, FormData>(
    logoutAction,
    initialState
  );
  const { pending } = useFormStatus();

  return (
    <Form action={formAction} className="flex flex-col gap-4 min-w-full">
      {/* Submit button */}
      <SubmitButton pending={pending}>
        <div className="flex justify-center items-center gap-2">
          <FontAwesomeIcon icon={faSignOutAlt} className="text-gray-500" />
          <span>Log out</span>
        </div>
      </SubmitButton>
      {/* A popup displays the returned form state message for both success and error cases */}
      {state.message && <FormStatePopup state={state} />}
    </Form>
  );
};

export default LogoutForm;
