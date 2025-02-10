
import React from "react";
import CreateForm from "./CreateForm";
import {Title} from "@/components/dashboard_ui/Toolbar";
import FormContainer from "@/components/auth_ui/FormContainer";



const Index = () => {
  return (
    <FormContainer className="lg:w-10/12">
      <Title>Create a New Feature</Title>
      <CreateForm />
    </FormContainer>
  );
};

export default Index;

