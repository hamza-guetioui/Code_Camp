import React from "react";
import Container from "@/components/container";
import { Title } from "@/components/dashboard_ui/Toolbar";
import BasicBars from "@/components/MUI/Charts/BarChart";
import PieArcLabel from "@/components/MUI/Charts/PieChart";
import BasicArea from "@/components/MUI/Charts/LineChart";
import Boxes from "./Boxes";
const Index = () => {
  return (
    <Container className="p-4 flex flex-col gap-4">
      <Title>Dashboard</Title>
      <Boxes />
      <Container className="flex gap-4 max-sm:flex-col ">
        <BasicBars />
        <PieArcLabel />
      </Container>
      <BasicArea />
    </Container>
  );
};

export default Index;
