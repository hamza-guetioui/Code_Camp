import React from "react";
import Container from "@/components/container";
import Sort from "./Sort";
import { DataProvider } from "./dataContext";
import SearchInput from "./Search";
import Users from "./Users";

const Index = () => {
  return (
    <DataProvider>
      <Container className=" my-14">
        <Container>
          <h1>Users</h1>
          <Container className="px-6 py-2 flex justify-between items-center">
            <SearchInput />
            <Sort />
          </Container>
        </Container>

        <Users/>
      </Container>
    </DataProvider>
  );
};

export default Index;
