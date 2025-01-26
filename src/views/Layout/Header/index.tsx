import React from "react";
import Image from "next/image";

import Navbar from "./navbar";
import Navigation from "./navigation";

import Container from "@/components/container";
import Profile from "./Profile";
import { IUser } from "@/types/user";
import {GET_USER} from "@/actions/User";

const Index = async () => {
  const user: IUser | null = await GET_USER();
  return (
    <header className="sticky top-0 z-30 shadow-md max-md:py-4 bg-white">
      <Container className="grid grid-cols-[1fr_auto_1fr]  items-center  px-4 max-w-6xl mx-auto">
        <Logo />
        <Navbar>
          <Navigation />
        </Navbar>
        <Profile user={user} />
      </Container>
    </header>
  );
};

export default Index;

const Logo = () => {
  return (
    <div className="order-2 lg:order-1 ">
      <Image
        src="next.svg"
        alt="Next.js logo"
        width={148}
        height={38}
        priority
      />
    </div>
  );
};
