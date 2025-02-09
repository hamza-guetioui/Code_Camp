"use client"
import React, { useState } from "react";
import Form from "next/form";
import { useFormState, useFormStatus } from "react-dom";
import Input, { InputErrorMessage } from "@/components/auth_ui/Input";
import { loginAction, IFormState } from "@/lib/actions/Login";
import SubmitButton from "@/components/auth_ui/SubmitButton";
import FormStatePopup from "@/components/auth_ui/FormStatePopup";
import RememberMe from "@/components/auth_ui/RememberMe";

// Initial state for the form
const initialState: IFormState = {
  usernameState: "",
  passwordState: "",
  status: null,
  message: "",
};

const LoginForm = () => {
  //  // useActionState hook to manage form state and actions
  //  const [pending, state, formAction] = useActionState<IFormState, FormData>(
  //   login,
  //   initialState
  // );
  // useFormState hook to manage form state and actions
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [state, formAction] = useFormState<IFormState, FormData>(
    loginAction,
    initialState
  );
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    state.usernameState = ""
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    state.passwordState = ""
  }
  const { pending } = useFormStatus()
  return (
    <Form action={formAction} className="flex flex-col gap-4 min-w-full">
      {/* <Input type="hidden" value={csrfToken} name="csrf_token" /> */}
      <Input type="text" placeholder="User name or Email" name="username" value={username} onChange={(event)=> handleUsernameChange(event)}>
        <InputErrorMessage state={state.usernameState} />
      </Input>

      <Input type="password" placeholder="Password" name="password" value={password} onChange={(event)=> handlePasswordChange(event)}>
        <InputErrorMessage state={state.passwordState} />
      </Input>
      {/* Remember Me Checkbox */}
      <RememberMe />

      {/* A popup displays the returned form state message for both success and error cases */}
      {(!state.usernameState || !state.passwordState) && state.message && (
        <FormStatePopup state={state} />
      )}
      {/* Submit button */}
      <SubmitButton pending={pending}>Log in</SubmitButton>
    </Form>
  );
};

export default LoginForm;


