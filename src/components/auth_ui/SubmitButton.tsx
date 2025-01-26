"use client"
import React from "react";

interface SubmitButtonProps {
  pending: boolean; // Whether the button is in a loading state
  children: React.ReactNode; // Custom content for the button
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ pending, children }) => {
  return (
    <button
      type="submit" // Ensure the button submits the form
      disabled={pending} // Disable the button when pending
      className="text-white rounded-full p-4 bg-black hover:bg-slate-900 disabled:bg-gray-400 transition-colors duration-300"
    >
      {pending ? "Loading..." : children}
    </button>
  );
};

export default SubmitButton;