"use client";
import React, { useEffect, useState } from "react";
import RequistForm from "./RequistForm";
import FormContainer from "@/components/auth_ui/FormContainer";
import RedirectTo from "@/components/auth_ui/RedirectTo";
import Title from "@/components/auth_ui/Title";
import ResetForm from "./ResetForm";
import FormStatePopup from "@/components/auth_ui/FormStatePopup";

const REQUIST_FORM_DESCRIPTION =
  "Enter your email or username to receive a verification code for resetting your password.";
const RESET_FORM_DESCRIPTION =
  "Enter the verification code sent to your email, then create a new password to secure your account.";

const Index = () => {
  const [username, setUsername] = useState<string>("");
  const [state, setState] = useState<{
    status: number | null;
    message: string;
  }>({ status: null, message: "" });

  useEffect(() => {
    if (username) {
      setState({
        status: 200,
        message: "Verification code sent to your email.",
      });
    }
  }, [username]);
  return (
    <FormContainer>
      <div className="flex flex-col justify-center items-center mb-4">
        <Title className={"mb-2"}>
          {username ? "Enter Code" : "Reset Password"}
        </Title>
        <Description>
          {username ? RESET_FORM_DESCRIPTION : REQUIST_FORM_DESCRIPTION}
        </Description>
      </div>

      {!username ? (
        <RequistForm onCodeSent={(username: string) => setUsername(username)} />
      ) : (
        <ResetForm username={username} />
      )}
      <RedirectTo
        link="/login"
        title="Log in"
        label="Already have an account?"
      />
      {/* Display reset form state message as a popup */}
      {(state.message && state.status === 200) && (
        <FormStatePopup state={state} />
      )}
    </FormContainer>
  );
};

export default Index;

const Description = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-gray-500 text-center text-sm">{children}</p>;
};
