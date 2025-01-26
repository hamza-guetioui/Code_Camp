import React from "react";
import Link from "next/link";
import LoginForm from "./LoginForm";
import Title from "@/components/auth_ui/Title";
import Container from "@/components/auth_ui/container";

const Login = () => {
  return (
    <Container>
      <Title>Login</Title>
      <LoginForm />
      <GoToSignup link={"/register"} />
      <GoToReset link={"/reset"} />
    </Container>
  );
};

export default Login;

const GoToSignup = ({ link }: { link: string }) => {
  return (
    <div className="flex gap-2 items-center">
      {" "}
      <p>Don&apos;t have an account?</p>
      <Link href={link} className="font-bold text-blue-500">
        Sign up
      </Link>
    </div>
  );
};
const GoToReset = ({ link }: { link: string }) => {
  return (
    <div className="flex gap-2 items-center">
      {" "}
      <p> Forgot your password?</p>
      <Link href={link} className="font-bold text-blue-500">
        Reset
      </Link>
    </div>
  );
};
