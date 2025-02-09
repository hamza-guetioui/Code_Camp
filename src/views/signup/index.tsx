import React from "react";
import SignupForm from "./SignupForm";
import Title from "@/components/auth_ui/Title";
import FormContainer from "@/components/auth_ui/FormContainer";
import RedirectTo from "@/components/auth_ui/RedirectTo";

const Index = () => {
  return (
    <FormContainer>
      <Title>Sign up</Title>
      <SignupForm />
      <RedirectTo link={"/login"} title="Log in" label="Already have an account?"  />
    </FormContainer>
  );
};

export default Index;
