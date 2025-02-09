"use client";

import React, { useState } from "react";
import Form from "next/form";
import { useFormState, useFormStatus } from "react-dom";
import Input, { InputErrorMessage } from "@/components/auth_ui/Input";
import { SignUp, IFormState } from "@/lib/actions/Signup";
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
    SignUp,
    initialState
  );
  // useFormStaus hook to handle pending state
  const { pending } = useFormStatus();

  // useState hooks to manage form input values (used for checking its strong password && matching confirm password )
  const [email, setEmail] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    state.emailState = "";
  };
  const handleFullnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullname(e.target.value);
    state.fullnameState = "";
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    state.passwordState = "";
  };
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    state.passwordRepeatState = "";
  };

  return (
    <Form action={formAction} className="flex flex-col gap-4 min-w-full">
      <Input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={(event) => handleEmailChange(event)}
      >
        <InputErrorMessage state={state.emailState} />
      </Input>

      <Input
        type="text"
        placeholder="Full Name"
        name="fullName"
        value={fullname}
        onChange={(event) => handleFullnameChange(event)}
      >
        <InputErrorMessage state={state.emailState} />
      </Input>

      <Input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={(event) => handlePasswordChange(event)}
      >
        <InputErrorMessage state={state.passwordState} />
        <PasswordValidation password={password} />
      </Input>

      <Input
        type="password"
        placeholder="Confirm Password"
        name="passwordRepeat"
        value={confirmPassword}
        onChange={(event) => handleConfirmPasswordChange(event)}
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
