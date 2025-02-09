import React from "react";
import LoginForm from "./LoginForm";
import Title from "@/components/auth_ui/Title";
import FormContainer from "@/components/auth_ui/FormContainer";
import RedirectTo from "@/components/auth_ui/RedirectTo";

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

