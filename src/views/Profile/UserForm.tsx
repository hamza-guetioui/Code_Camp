"use client";
import { IUserState, PUT_USER } from "@/lib/actions/User";
import React, { useState } from "react";
import Form from "next/form";
import FormStatePopup from "@/components/form_ui/FormStatePopup";
import SubmitButton from "@/components/form_ui/SubmitButton";
import ConfirmPassword from "@/components/form_ui/ConfirmPassword";
import { InputErrorMessage } from "@/components/form_ui/Input";
import PasswordStrengthChecklist from "@/components/form_ui/PasswordStrengthChecklist";
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
  const [fullName, setFullName] = useState(user.fullName ?? "");
  const [username, setUsername] = useState(user.username ?? "");
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
        onChange={(e) => setFullName(e.target.value)}
        value={fullName}
        label="Full Name"
      >
        <InputErrorMessage state={state.emailState} />
      </Input>
      <Input
        type="text"
        placeholder="User Name"
        name="userName"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
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
        <PasswordStrengthChecklist password={password} />
      </Input>

      <Input
        type="password"
        placeholder="Confirm Password"
        name="passwordRepeat"
        onChange={(e) => setConfirmPassword(e.target.value)}
        label="Confirm Password"
      >
             <InputErrorMessage state={state.passwordRepeatState} />
        <ConfirmPassword
          password={password}
          confirmPassword={confirmPassword}
        />
   
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
