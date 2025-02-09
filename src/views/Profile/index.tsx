import { GET_USER } from "@/lib/actions/User";
import Container from "@/components/container";
import { IUser } from "@/types/user";
import Link from "next/link";
import React from "react";
import Picture from "./Picture";
import UserInfo from "./UserForm";
import BackTo from "./BackTo";

const Index = async () => {
  // Fetch user data
  const user: IUser | null = await GET_USER();

  // Handle the case where user data is not available
  if (user === null) {
    return <Redirect to="/login" />;
  }

  // Render user data
  return (
    <main className="flex flex-col items-center justify-center relative">
      <Info>
        <BackTo path="/dashboard" title="Dashboad" />
        {/* Picture need id as props to get User imageUrl from endpoint api */}
        <Picture user={user} />
        <UserInfo user={user} />
      </Info>
    </main>
  );
};

export default Index;

const Redirect = ({ to }: { to: string }) => {
  return (
    <Container className="flex flex-col items-center justify-center p-4 shadow-xl">
      <h1>No User Data Found</h1>
      <p>
        Please{" "}
        <Link href={to} className="text-blue-500">
          {" "}
          log in
        </Link>{" "}
        to view your profile.
      </p>
    </Container>
  );
};

const Info = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container className=" flex flex-col justify-center items-center  my-16 gap-2 p-4 max-w-[40%] min-w-[40%] shadow-xl">
      {children}
    </Container>
  );
};
