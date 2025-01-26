"use client";

import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Input, { InputErrorMessage } from "@/components/auth_ui/Input";
import { send, ISend } from "@/actions/SendCode";
import SubmitButton from "@/components/auth_ui/SubmitButton";
import FormStatePopup from "@/components/auth_ui/FormStatePopup";
import Title from "@/components/auth_ui/Title";
import Form from "next/form";
import ResetPassword from "./ResetPassword";

// Initial state for the reset form
const initialResetState: ISend = {
  message: "",
  username: "",
  usernameState: "",
  status: null,
};

const ResetAndValidate = () => {
  const [showCodeInput, setShowCodeInput] = useState(false);

  // useFormState for the reset form
  const [resetState, resetFormAction] = useFormState<ISend, FormData>(
    send,
    initialResetState
  );

  // useFormStatus for pending state
  const { pending: resetPending } = useFormStatus();

  // If the reset form is successful, show the code input
  React.useEffect(() => {
    if (resetState.status === 200) {
      setShowCodeInput(true);
    }
  }, [resetState.status]);

  return (
    <>
      <Title>{showCodeInput ? "Enter Code" : "Reset Password"}</Title>

      {/* Reset Form (Email Input) */}
      {!showCodeInput && (
        <Form
          action={resetFormAction}
          className="flex flex-col gap-4 min-w-full"
        >
            <Input
              type="text"
              placeholder="Username or Email"
              name="username"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                resetState.usernameState
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            >
              <InputErrorMessage state={resetState.usernameState} />
            </Input>

          {/* Submit Button */}
          <SubmitButton pending={resetPending}>Send Code</SubmitButton>

          {/* Display reset form state message as a popup */}
          <FormStatePopup state={resetState} />
        </Form>
      )}

      {/* Validate Form (Code Input) */}
      {(showCodeInput && resetState.username) &&<ResetPassword username={ resetState.username} />}
    </>
  );
};

export default ResetAndValidate;

// Code Input Component
