"use client";
import React, { useEffect, useState } from "react";
import Form from "next/form";
import { useFormState, useFormStatus } from "react-dom";
import Input, { InputErrorMessage } from "@/components/form_ui/Input";
import { POST_FEATURE, IFormState } from "@/lib/actions/Feature";
import SubmitButton from "@/components/form_ui/SubmitButton";
import { useRefresh } from "@/context/refrechContext";
import { useAlert } from "@/context/alertContext";

// Initial state for the form
const initialState: IFormState = {
  nameState: "",
  codeState: "",
  status: null,
  message: "",
};

const CreateForm = () => {
  //  // useActionState hook to manage form state and actions
  //  const [pending, state, formAction] = useActionState<IFormState, FormData>(
  //   login,
  //   initialState
  // );
  // useFormState hook to manage form state and actions
  const [name, setName] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [state, formAction] = useFormState<IFormState, FormData>(
    POST_FEATURE,
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

  const { refreshData } = useRefresh();
  const { handleAlert } = useAlert();
  useEffect(() => {
    if (state.message && state.status) {
      if (state.status === 200) {
        refreshData();
      }
      if (!state.nameState || !state.codeState) {
        handleAlert({ message: state.message, status: state.status });
      }
    }
  }, [state, refreshData]);
  return (
    <Form action={formAction} className="flex flex-col gap-4 min-w-full">
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

      {/* Submit button */}
      <SubmitButton pending={pending}>Create</SubmitButton>
    </Form>
  );
};

export default CreateForm;
