"use client";

import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Input, { InputErrorMessage } from "@/components/Input";
import { reset, IReset, valide, IValidate } from "@/actions/Reset";
import SubmitButton from "@/components/SubmitButton";
import FormStatePopup from "@/components/FormStatePopup";
import Title from "@/components/Title";
import Form from "next/form";

// Initial state for the reset form
const initialResetState: IReset = {
  message: "",
  usernameState: "",
  status: null,
};

// Initial state for the validate form
const initialValidateState: IValidate = {
  message: "",
  codeState: "",
  status: null,
};

const ResetAndValidate = () => {
  const [showCodeInput, setShowCodeInput] = useState(false);

  // useFormState for the reset form
  const [resetState, resetFormAction] = useFormState<IReset, FormData>(
    reset,
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
          <div className="mb-6">
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
          </div>

          {/* Submit Button */}
          <SubmitButton pending={resetPending}>Send Code</SubmitButton>

          {/* Display reset form state message as a popup */}
          <FormStatePopup state={resetState} />
        </Form>
      )}

      {/* Validate Form (Code Input) */}
      {showCodeInput && <EntreCode />}
    </>
  );
};

export default ResetAndValidate;

// Code Input Component
const EntreCode = () => {
  const [validateState, validateFormAction] = useFormState<IValidate, FormData>(
    valide,
    initialValidateState
  );
  const { pending: validatePending } = useFormStatus();

  return (
    <Form
      action={validateFormAction}
      className="flex flex-col gap-2 min-w-full"
    >
      <div className="mb-6">
        <Input
          type="number"
          placeholder="Enter your code"
          name="code"
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
            validateState.codeState
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        >
          <InputErrorMessage state={validateState.codeState} />
        </Input>
      </div>

      {/* Submit Button */}
      <SubmitButton pending={validatePending}>Validate Code</SubmitButton>

      {/* Display validate form state message as a popup */}
      <FormStatePopup state={validateState} />
    </Form>
  );
};
