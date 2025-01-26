import React from "react";
import Link from "next/link";
import ResetForm from "./ResetForm";

const Login = () => {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="w-1/3 p-8 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center gap-4 ">
        <ResetForm />
        <Redirection />
      </div>
    </main>
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
