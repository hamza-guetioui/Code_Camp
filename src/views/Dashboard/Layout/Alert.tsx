"use client";
import FormStatePopup from "@/components/form_ui/FormStatePopup";
import { useAlert } from "@/context/alertContext";
import React from "react";

const Alert = () => {
  const { alert  } = useAlert();

  if (!alert) return null;
  return (
    <>
      {/* A popup displays the returned form state message for both success and error cases */}
      {alert.message && <FormStatePopup state={alert} />}
    </>
  );
};

export default Alert;
