"use client";
import React, { useState } from "react";
import Form from "next/form";
import { useFormState, useFormStatus } from "react-dom";
import Input, { InputErrorMessage } from "@/components/auth_ui/Input";
import { PUT_FEATURE, IFormState } from "@/lib/actions/Feature";
import SubmitButton from "@/components/auth_ui/SubmitButton";
import FormStatePopup from "@/components/auth_ui/FormStatePopup";
import { IFeature } from "@/types/feature";

// Initial state for the form
const initialState: IFormState = {
  nameState: "",
  codeState: "",
  status: null,
  message: "",
};

const UpdateForm = ({ feature }: { feature: IFeature }) => {
  //  // useActionState hook to manage form state and actions
  //  const [pending, state, formAction] = useActionState<IFormState, FormData>(
  //   login,
  //   initialState
  // );
  // useFormState hook to manage form state and actions
  const [name, setName] = useState<string>(feature.name ?? "");
  const [code, setCode] = useState<string>(feature.code ?? "");
  const [state, formAction] = useFormState<IFormState, FormData>(
    PUT_FEATURE,
    initialState
  );
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    state.nameState = "";
  };
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    state.codeState = "";
  };
  const { pending } = useFormStatus();
  return (
    <Form action={formAction} className="flex flex-col gap-4 min-w-full">
      <Input type="hidden" readOnly={true} name="id" value={feature.id} />

      <Input
        type="text"
        placeholder="feature name"
        name="name"
        value={name}
        onChange={(event) => handleNameChange(event)}
      >
        <InputErrorMessage state={state.nameState} />
      </Input>
      <Input
        type="text"
        placeholder="feature code"
        name="code"
        value={code}
        onChange={(event) => handleCodeChange(event)}
      >
        <InputErrorMessage state={state.nameState} />
      </Input>

      {/* A popup displays the returned form state message for both success and error cases */}
      {(!state.nameState || !state.codeState) && state.message && (
        <FormStatePopup state={state} />
      )}
      {/* Submit button */}
      <SubmitButton pending={pending}>Edit</SubmitButton>
    </Form>
  );
};

export default UpdateForm;
