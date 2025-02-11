import Container from "@/components/container";
import Toolbar from "@/components/dashboard_ui/Toolbar";
import React from "react";
import FeaturesData from "./FeaturesData";

const Index = async () => {
  
  return (
    <Container className="p-4">
      <Toolbar title={"Features"} create={"/dashboard/features/create-new"} />
      <FeaturesData  />
    </Container>
  );
};

export default Index;
