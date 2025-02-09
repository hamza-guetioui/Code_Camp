"use client";
import React from "react";
import Users from "./Users";
import Roles from "./Roles";
import Container from "@/components/container";

const Index = () => {
  return (
    <Container className="w-full">
      <Users />
      <Roles />
    </Container>
  );
};

export default Index;
