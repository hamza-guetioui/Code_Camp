"use client";

import React from "react";
import Loader from "@/components/Loader";


type SubmitButtonProps = {
  pending: boolean; // Whether the button is in a loading state
  className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

const cn = (className?: string) => className ?? "";

const SubmitButton: React.FC<SubmitButtonProps> = ({ pending,className ,children }) => {
  return (
    <button
      type="submit" 
      disabled={pending}
      className={`text-white mt-4 rounded-full p-4 bg-black hover:bg-slate-900 disabled:bg-gray-400 transition-colors duration-300 ${cn(className)}`}
    >
      {pending ? <Loader /> : children || "Submit"}
    </button>
  );
};

export default SubmitButton;