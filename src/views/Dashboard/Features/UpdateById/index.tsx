import React from "react";
import UpdateForm from "./UpdateForm";
import { Title } from "@/components/dashboard_ui/Toolbar";
import FormContainer from "@/components/form_ui/FormContainer";
import { GET_FEATURE } from "@/lib/actions/Feature";
import ErrorMessage from "@/components/dashboard_ui/ErrorMessage";

const Index = async ({ id }: { id: string }) => {
  const feature = await GET_FEATURE(id);

  if (!feature) {
    return (
      <ErrorMessage
        title="Feature Not Found"
        message="The feature you're looking for doesn't exist or may have been removed."
      />
    );
  }

  return (
    <FormContainer>
      <Title>Update Feature</Title>
      <UpdateForm feature={feature} />
    </FormContainer>
  );
};

export default Index;
