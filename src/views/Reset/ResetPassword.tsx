"use client";

import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Input, { InputErrorMessage } from "@/components/auth_ui/Input";

import { reset, IReset } from "@/actions/ResetPassword";
import SubmitButton from "@/components/auth_ui/SubmitButton";
import FormStatePopup from "@/components/auth_ui/FormStatePopup";
import Form from "next/form";
import ConfirmPassword from "@/components/auth_ui/ConfirmPassword";
import PasswordValidation from "@/components/auth_ui/ValidationPassword";

// Initial state for the reset form
const initialResetState: IReset = {
  message: "",
  codeState: "",
  status: null,
  passwordState: "",
  passwordRepeatState: "",
};

const ResetPassword = ({ username }: { username: string }) => {
  const [resetState, resetFormAction] = useFormState<IReset, FormData>(
    reset,
    initialResetState
  );
  const { pending: resetPending } = useFormStatus();

  // useState hooks to manage form input values (used for checking its strong passwords && matching confirm passwords )
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <Form
      action={resetFormAction}
      className="flex flex-col gap-2 min-w-full"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        value={username}
        name="username"
        readOnly={username.length > 0}
      ></Input>
      <Input
        type="number"
        placeholder="Enter your code"
        name="code"
        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
          resetState.codeState
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        }`}
      >
        <InputErrorMessage state={resetState.codeState} />
      </Input>

      <Input
        type="password"
        placeholder="Password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      >
        <InputErrorMessage state={resetState.passwordState} />
        <PasswordValidation password={password} />
      </Input>

      <Input
        type="password"
        placeholder="Confirm Password"
        name="passwordRepeat"
        onChange={(e) => setConfirmPassword(e.target.value)}
      >
        <ConfirmPassword
          password={password}
          confirmPassword={confirmPassword}
        />
        <InputErrorMessage state={resetState.passwordRepeatState} />
      </Input>

      {/* Submit Button */}
      <SubmitButton pending={resetPending}>reset Code</SubmitButton>

      {/* Display reset form state message as a popup */}
      <FormStatePopup state={resetState} />
    </Form>
  );
};

export default ResetPassword;
