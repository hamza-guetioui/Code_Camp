import React from "react";
import Link from "next/link";
import SignupForm from "./SignupForm";
import Title from "@/components/auth_ui/Title";
import Container from "@/components/auth_ui/container";

const Registration = () => {
  return (
    <Container>
      <Title>Sign up</Title>
      <SignupForm />
      <GoToLogIn link={"/login"} />
    </Container>
  );
};

export default Registration;

const GoToLogIn = ({ link }: { link: string }) => {
  return (
    <div className="flex gap-2 items-center">
      {" "}
      <p>Already have an account?</p>
      <Link href={link} className="font-bold text-blue-500">
        Log In
      </Link>
    </div>
  );
};
