import React from "react";
import Sidebar from "./Sidebar";
import Menu from "./Sidebar/Menu";
import Container from "@/components/container";
import Alert from "./Alert";

type Props = {
  children: React.ReactNode;
};

const Index: React.FC<Props> = ({ children }) => {
  return (
    <main className="flex">
      <Alert />
      <Menu>
        <Sidebar />
      </Menu>
      <Container className="w-full">{children}</Container>
    </main>
  );
};

export default Index;
