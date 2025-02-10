import React from "react";

import Container from "@/components/container";
import Profile from "./Profile";
import { IUser } from "@/types/user";
import { GET_USER } from "@/lib/actions/User";
import Logo from "./Logo";

const Index = async () => {
  const user: IUser | null = await GET_USER();
  return (
    <header className="sticky top-0 shadow-md max-md:py-4 bg-white z-40">
      <Container className="flex justify-between  p-2 max-w-7xl mx-auto">
        <Logo />
        <Profile user={user} />
      </Container>
    </header>
  );
};

export default Index;
