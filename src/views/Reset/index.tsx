import React from "react";
import Link from "next/link";
import ResetForm from "./ResetForm";
import Container from "@/components/auth_ui/container";

const Login = () => {
  return (
    <Container>
      <ResetForm />
      <Redirection />
    </Container>
  );
};

export default Login;

const Redirection = () => {
  return (
    <div className="flex gap-2 items-center">
      {" "}
      <p>Already have an account? </p>
      <Link href="/login" className="font-bold text-blue-500">
        Login
      </Link>
    </div>
  );
};
