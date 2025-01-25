import React from "react";
import Link from "next/link";
import LoginForm from "./LoginForm";
import Title from "@/components/Title";

const Login = () => {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="w-1/3 p-8 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center gap-4 ">
        <Title>Login</Title>
        <LoginForm />

        <Signup>
          <p>Don&apos;t have an account?</p>
          <Link href="/registration" className="font-bold text-blue-500">
            Sign up
          </Link>
        </Signup>
        <Reset>
          <p> Forgot your password?</p>
          <Link href="/reset" className="font-bold text-blue-500">
            Reset
          </Link>
        </Reset>
      </div>
    </main>
  );
};

export default Login;

const Signup = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex gap-2 items-center">{children}</div>;
};
const Reset = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex gap-2 items-center">{children}</div>;
};
