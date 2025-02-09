import React from "react";
import Sidebar from "./Sidebar";
import Menu from "./Sidebar/Menu";

type Props = {
  children: React.ReactNode;
};

const Index: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Menu>
        <Sidebar />
      </Menu>
      {children}
    </>
  );
};

export default Index;
