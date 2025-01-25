import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormStatePopupProps {
  state: {
    status: number | null;
    message: string;
  };
}

const FormStatePopup: React.FC<FormStatePopupProps> = ({ state }) => {
  const [isVisible, setIsVisible] = useState(true);
  React.useEffect(() => {
    if (state.status === 200) {
      const timer = setTimeout(() => setIsVisible(false), 5000); // Close after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [state.status]);
  // Only show the popup if status is 200 and it's visible
  if (state.status !== 200 || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
  {state.status === 200 && isVisible && (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-4 right-4 p-4 bg-green-500 text-white rounded-lg shadow-lg flex items-center justify-between gap-4"
    >
      <p>{state.message}</p>
      <button
        onClick={() => setIsVisible(false)}
        className="text-white hover:text-gray-200 focus:outline-none"
      >
        &times;
      </button>
    </motion.div>
  )}
</AnimatePresence>
  );
};

export default FormStatePopup;
