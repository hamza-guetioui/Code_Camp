import React from "react";
import Container from "@/components/container";
import Sort from "./Sort";
import { DataProvider } from "./dataContext";
import SearchInput from "./Search";
import Roles from "./Roles";

const Index = () => {
  return (
    <DataProvider>
      <Container className="my-14">
        <Container className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Roles :</h1>
          <Container className="px-6 py-4 flex justify-between items-center border-b border-gray-200">
            <SearchInput />
            <Sort />
          </Container>
          <Roles />
        </Container>
      </Container>
    </DataProvider>
  );
};

export default Index;
