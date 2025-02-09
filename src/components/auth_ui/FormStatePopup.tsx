"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormStatePopupProps {
  state: {
    status: number | null;
    message: string;
  };
  className?: string;
}
const cn = (className?: string) => className ?? "";

const FormStatePopup: React.FC<FormStatePopupProps> = ({
  state,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Automatically hide the popup after 5 seconds
  useEffect(() => {
    if (state.status === 200 || state.status === 400) {
      const timer = setTimeout(() => setIsVisible(false), 5000); // Close after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [state.status]);

  // Don't render the popup if there's no status or if it's not visible
  if (!state.status || !isVisible) {
    return null;
  }

  // Determine the popup style based on the status
  const popupStyles =
    state.status === 200
      ? "bg-green-500 text-white" // Success style
      : "bg-red-500 text-white"; // Error style

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: -50 }}
          animate={{ opacity: 1, y: 0, x: -50 }}
          exit={{ opacity: 0, y: -20, x: -50 }}
          className={`fixed top-8 right-1/3 py-4 px-12 rounded-lg shadow-lg flex items-center justify-between gap-4 ${popupStyles}${cn(
            className
          )}}`}
        >
          <p>{state.message}</p>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white font-bold text-3xl hover:text-gray-200 focus:outline-none"
          >
            &times;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormStatePopup;
