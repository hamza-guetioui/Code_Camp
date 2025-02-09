import React from "react";
import Container from "@/components/container";
import Sort from "./Sort";
import { DataProvider } from "./dataContext";
import SearchInput from "./Search";
import Users from "./Users";

const Index = () => {
  return (
    <DataProvider>
      <Container className="my-14">
        <Container className=" rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Users :</h1>
          <Container className="px-6 py-4 flex justify-between items-center border-b border-gray-200">
            <SearchInput />
            <Sort />
          </Container>
          <Users />
        </Container>
      </Container>
    </DataProvider>
  );
};

export default Index;
