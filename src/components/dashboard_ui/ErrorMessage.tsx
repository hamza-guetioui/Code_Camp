"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Container from "../container";

type ErrorMessageProps = { title: string; message: string };

const ErrorMessage: React.FC<ErrorMessageProps> = ({ title, message }) => {
  const router = useRouter();

  return (
    <Container className="flex flex-col items-center m-16 justify-center p-6 bg-red-100 text-red-700 rounded-lg border border-red-300 shadow-md">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-red-600">{message}</p>
      <button
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        onClick={() => router.back()}
      >
        Go Back
      </button>
    </Container>
  );
};

export default ErrorMessage;