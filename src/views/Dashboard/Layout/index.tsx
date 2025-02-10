import React from "react";
import Sidebar from "./Sidebar";
import Menu from "./Sidebar/Menu";
import Container from "@/components/container";

type Props = {
  children: React.ReactNode;
};

const Index: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Menu>
        <Sidebar />
      </Menu>
      <Container className="w-full">{children}</Container>
    </>
  );
};

export default Index;
