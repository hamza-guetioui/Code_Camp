"use client";

import React, { useState } from "react";
import Form from "next/form";
import { useFormState, useFormStatus } from "react-dom";
import Input, { InputErrorMessage } from "@/components/auth_ui/Input";
import { signup, IFormState } from "@/actions/Signup";
import ConfirmPassword from "@/components/auth_ui/ConfirmPassword";
import SubmitButton from "@/components/auth_ui/SubmitButton";
import PasswordValidation from "@/components/auth_ui/ValidationPassword";
import FormStatePopup from "@/components/auth_ui/FormStatePopup";

// Initial state for the form
const initialState: IFormState = {
  message: "", 
  emailState: "",
  fullnameState: "",
  status: null,
  passwordState: "",
  passwordRepeatState: "",
};

const SignupForm = () => {
  // useFormState hook to manage form state and actions
  const [state, formAction] = useFormState<IFormState, FormData>(
    signup,
    initialState
  );
  // useFormStaus hook to handle pending state
  const { pending } = useFormStatus();

  // useState hooks to manage form input values (used for checking its strong passwords && matching confirm passwords )
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <Form
      action={formAction}
      className="flex flex-col gap-4 min-w-full"
      onSubmit={() => handleSubmit()}
    >
      <Input type="email" placeholder="Email" name="email">
        <InputErrorMessage state={state.emailState} />
      </Input>

      <Input type="text" placeholder="Full Name" name="fullName">
        <InputErrorMessage state={state.emailState} />
      </Input>

      <Input
        type="password"
        placeholder="Password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      >
        <InputErrorMessage state={state.passwordState} />
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
        <InputErrorMessage state={state.passwordRepeatState} />
      </Input>

      {/* Display form state message */}
      {(!state.emailState ||
        !state.passwordState ||
        !state.passwordRepeatState ||
        !state.fullnameState) &&
        state.message && <FormStatePopup state={state} />}
      {/* Submit button */}
      <SubmitButton pending={pending}>Sign up</SubmitButton>
    </Form>
  );
};

export default SignupForm;
