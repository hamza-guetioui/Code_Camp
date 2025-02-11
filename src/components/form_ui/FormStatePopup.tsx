"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

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
      ? "bg-green-400 text-white" // Success style
      : "bg-red-400 text-white"; // Error style

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: -50 }}
          animate={{ opacity: 1, y: 0, x: -50 }}
          exit={{ opacity: 0, y: -20, x: -50 }}
          className={`fixed text-white top-12 right-1/3 py-2 px-8 z-50 rounded-lg shadow-lg flex items-center justify-between gap-4 ${popupStyles}${cn(
            className
          )}}`}
        >
          <p className="text-lg">{state.message}</p>
          <button
            onClick={() => setIsVisible(false)}
            className=" hover:text-slate-200 focus:outline-none text-2xl"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormStatePopup;
