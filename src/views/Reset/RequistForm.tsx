"use client";

import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Input, { InputErrorMessage } from "@/components/auth_ui/Input";
import { requist, IRequist } from "@/lib/actions/RequistCode";
import SubmitButton from "@/components/auth_ui/SubmitButton";
import FormStatePopup from "@/components/auth_ui/FormStatePopup";
import Form from "next/form";

// Initial state for the reset form
const initialState: IRequist = {
  username: "",
  usernameState: "",
  status: null,
  message: "",
};

const RequistForm = ({
  onCodeSent,
}: {
  onCodeSent: (username: string) => void;
}) => {
  // useFormState for the reset form
  const [state, FormAction] = useFormState<IRequist, FormData>(
    requist,
    initialState
  );
  const { pending } = useFormStatus();

  // If the reset form is successful, show the code input
  useEffect(() => {
    if (state.status === 200 && state?.username !== undefined) {
      onCodeSent(state.username);
    }
  }, [state, onCodeSent]);

  return (
    <Form action={FormAction} className="flex flex-col gap-4 min-w-full">
      <Input
        type="text"
        placeholder="Username or Email"
        name="username"
        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
          state.usernameState
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        }`}
      >
        <InputErrorMessage state={state.usernameState} />
      </Input>

      {/* Submit Button */}
      <SubmitButton className={"mt-0"} pending={pending}>
        Send Code
      </SubmitButton>

      {/* Display reset form state message as a popup */}
      {state.message && !state.usernameState && (
        <FormStatePopup state={state} />
      )}
    </Form>
  );
};

export default RequistForm;
