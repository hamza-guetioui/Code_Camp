"use client";

import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Input, { InputErrorMessage } from "@/components/form_ui/Input";
import { reset, IReset } from "@/lib/actions/ResetPassword";
import SubmitButton from "@/components/form_ui/SubmitButton";
import FormStatePopup from "@/components/form_ui/FormStatePopup";
import Form from "next/form";
import ConfirmPassword from "@/components/form_ui/ConfirmPassword";
import PasswordStrengthChecklist from "@/components/form_ui/PasswordStrengthChecklist";

// Initial state for the reset form
const initialState: IReset = {
  message: "",
  codeState: "",
  status: null,
  passwordState: "",
  passwordRepeatState: "",
};

const ResetForm = ({ username }: { username: string }) => {
  const [state, FormAction] = useFormState<IReset, FormData>(
    reset,
    initialState
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
    <div>
      <Form
        action={FormAction}
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
            state.codeState
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        >
          <InputErrorMessage state={state.codeState} />
        </Input>

        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        >
          <InputErrorMessage state={state.passwordState} />
          <PasswordStrengthChecklist password={password} />
        </Input>

        <Input
          type="password"
          placeholder="Confirm Password"
          name="passwordRepeat"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        >
          <ConfirmPassword
            password={password}
            confirmPassword={confirmPassword}
          />
          <InputErrorMessage state={state.passwordRepeatState} />
        </Input>

        {/* Submit Button */}
        <SubmitButton pending={resetPending}>Reset Password</SubmitButton>

        {/* Display reset form state message as a popup */}
        <FormStatePopup state={state} />
      </Form>
    </div>
  );
};

export default ResetForm;
