"use client";
import React, { useState } from "react";
import Container from "@/components/container";
import { IUser } from "@/types/user";
import ProfileMenu from "./ProfileMenu";
import ProfileButton from "./ProfileButton";



interface ProfileProps {
  user: IUser | null;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <Container className="relative order-3 flex justify-end">
      <ProfileButton user={user} onClick={toggleMenu} />
      {isMenuOpen && <ProfileMenu onClose={toggleMenu} />}
    </Container>
  );
};

export default Profile;



