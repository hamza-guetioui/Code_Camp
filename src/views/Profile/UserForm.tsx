"use client";
import { IUserState, PUT_USER } from "@/lib/actions/User";
import React, { useState } from "react";
import Form from "next/form";
import FormStatePopup from "@/components/auth_ui/FormStatePopup";
import SubmitButton from "@/components/auth_ui/SubmitButton";
import ConfirmPassword from "@/components/auth_ui/ConfirmPassword";
import { InputErrorMessage } from "@/components/auth_ui/Input";
import PasswordValidation from "@/components/auth_ui/ValidationPassword";
import { useFormState, useFormStatus } from "react-dom";
import { IUser } from "@/types/user";
import Input from "./Input";

// Initial state for the form
const initialState: IUserState = {
  message: "",
  emailState: "",
  usernameState: "",
  fullnameState: "",
  status: null,
  passwordState: "",
  passwordRepeatState: "",
};
const UserInfo = ({ user }: { user: IUser }) => {
  // useFormState hook to manage form state and actions
  const [state, formAction] = useFormState<IUserState, FormData>(
    PUT_USER,
    initialState
  );
  // useFormStaus hook to handle pending state
  const { pending } = useFormStatus();

  // useState hooks to manage form input values (used for checking its strong password && matching confirm password )
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
      <Input
        type="email"
        placeholder="Email"
        name="email"
        value={user.username}
        readOnly={true}
        label="Email"
        className="bg-slate-100 cursor-default"
      >
        <InputErrorMessage state={state.emailState} />
      </Input>
      <Input
        type="text"
        placeholder="Full Name"
        name="fullName"
        value={user.fullName}
        label="Full Name"
      >
        <InputErrorMessage state={state.emailState} />
      </Input>
      <Input
        type="text"
        placeholder="User Name"
        name="userName"
        value={user.username}
        label="User Name"
      >
        <InputErrorMessage state={state.emailState} />
      </Input>

      <Input
        type="password"
        placeholder="New Password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        label="New Password"
      >
        <InputErrorMessage state={state.passwordState} />
        <PasswordValidation password={password} />
      </Input>

      <Input
        type="password"
        placeholder="Confirm Password"
        name="passwordRepeat"
        onChange={(e) => setConfirmPassword(e.target.value)}
        label="Confirm Password"
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
      <SubmitButton pending={pending}>Update User</SubmitButton>
      {/* submitb button not working the update api not available */}
    </Form>
  );
};

export default UserInfo;
