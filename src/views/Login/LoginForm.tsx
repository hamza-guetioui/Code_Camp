"use client";

import React from "react";
import Form from "next/form";
import { useFormState, useFormStatus } from "react-dom";
import Input, { InputErrorMessage } from "@/components/auth_ui/Input";
import { login, IFormState } from "@/actions/Login";
import SubmitButton from "@/components/auth_ui/SubmitButton";
import FormStatePopup from "@/components/auth_ui/FormStatePopup";

// Initial state for the form
const initialState: IFormState = {
  message: "", 
  usernameState: "",
  status: null,
  passwordState: "",
};

const LoginForm = () => {
  //  // useActionState hook to manage form state and actions
  //  const [pending, state, formAction] = useActionState<IFormState, FormData>(
  //   login,
  //   initialState
  // );
  // useFormState hook to manage form state and actions
  const [state, formAction] = useFormState<IFormState, FormData>(
    login,
    initialState
  );

  // useFormStatus hook to handle pending state
  const { pending } = useFormStatus();
  return (
    <Form action={formAction} className="flex flex-col gap-4 min-w-full">
      <Input type="text" placeholder="User name or Email" name="username">
        <InputErrorMessage state={state.usernameState} />
      </Input>

      <Input type="password" placeholder="Password" name="password">
        <InputErrorMessage state={state.passwordState} />
      </Input>
      {/* Remember Me Checkbox */}
      <RememberMe />
      {/* Display form state message */}

      {(!state.usernameState || !state.passwordState) && state.message && (
        <FormStatePopup state={state} /> 
      )}
      {/* Submit button */}
      <SubmitButton pending={pending}>Log in</SubmitButton>
    </Form>
  );
};

export default LoginForm;

// FormState component

const RememberMe = () => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id="rememberMe"
        name="rememberMe"
        className="w-4 h-4 accent-blue-500 rounded"
      />
      <label htmlFor="rememberMe" className="text-sm text-gray-700">
        Remember Me
      </label>
    </div>
  );
};
