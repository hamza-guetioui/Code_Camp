import React from "react";
import LoginForm from "./LoginForm";
import Title from "@/components/form_ui/FormTitle";
import FormContainer from "@/components/form_ui/FormContainer";
import RedirectTo from "@/components/form_ui/RedirectTo";

const Login = () => {
  return (
    <FormContainer>
      <Title>Login</Title>
      <LoginForm />
      <RedirectTo
        title={"Sign up"}
        link={"/signup"}
        label={"Don't have an account?"}
      />
      <RedirectTo
        title={"Reset"}
        link={"/reset"}
        label={"Forgot your password?"}
      />
    </FormContainer>
  );
};

export default Login;
