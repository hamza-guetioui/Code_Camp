import React from "react";
import Link from "next/link";
import SignupForm from "./SignupForm";
import Title from "@/components/Title";

const Registration = () => {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className=" w-2/5 p-8 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center gap-4 ">
        <Title>Sign up</Title>
        <SignupForm />
        <LogIn>
          <p>Already have an account?</p>
          <Link href="/login" className="font-bold text-blue-500">
            Log In
          </Link>
        </LogIn>
      </div>
    </main>
  );
};

export default Registration;

const LogIn = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex gap-2 items-center">{children}</div>;
};
