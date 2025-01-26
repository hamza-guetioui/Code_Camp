import React from "react";
import Header from "./Header";
import RouteGuard from "@/components/RouteGuard";

type Props = {
  children: React.ReactNode;
};

const Index: React.FC<Props> = ({ children }) => {
  return (
    <>
      <RouteGuard>
        <Header />
      </RouteGuard>
      {children}
    </>
  );
};

export default Index;
