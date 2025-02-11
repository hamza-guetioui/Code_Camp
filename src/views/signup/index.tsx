import React from "react";
import SignupForm from "./SignupForm";
import Title from "@/components/form_ui/FormTitle";
import FormContainer from "@/components/form_ui/FormContainer";
import RedirectTo from "@/components/form_ui/RedirectTo";

const Index = () => {
  return (
    <FormContainer>
      <Title>Sign up</Title>
      <SignupForm />
      <RedirectTo
        link={"/login"}
        title="Log in"
        label="Already have an account?"
      />
    </FormContainer>
  );
};

export default Index;
