import Container from "@/components/container";
import Toolbar from "@/components/dashboard_ui/Toolbar";
import { GET_FEATURES } from "@/lib/actions/Feature";
import React from "react";
import FeaturesData from "./FeaturesData";
import { IFeature } from "@/types/feature";

const Index = async () => {
  const features : IFeature[] = await GET_FEATURES() ?? []
  return (
    <Container className="p-4">
      <Toolbar title={"Features"} create={"/dashboard/features/create-new"} />
      <FeaturesData features={features} />
    </Container>
  );
};

export default Index;
