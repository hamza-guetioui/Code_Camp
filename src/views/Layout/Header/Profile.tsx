"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/authContext";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/container";
import { IUser } from "@/types/user";

const Profile = ({user}: { user: IUser | null }) => {
  const { isAuth } = useAuth();
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const profilePicture =
    isAuth && user?.profilePicture ? user.profilePicture : null;

  return (
    <Container className="relative order-3 flex justify-end">
      {/* Profile button */}
      <ProfileButton onClick={toggleMenu} profilePicture={profilePicture} />
      {/* Dropdown menu */}
      {isMenuOpen && <DropMenu />}
    </Container>
  );
};

export default Profile;

const ProfileButton = ({
  onClick,
  profilePicture,
}: {
  onClick: () => void;
  profilePicture: string | null;
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-500"
    >
      {profilePicture ? (
        <Image
          src={profilePicture}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
        />
      ) : (
        <FontAwesomeIcon icon={faUser} className="text-xl" />
      )}
    </button>
  );
};

const DropMenu = () => {
  const { logout } = useAuth(); // Logout action from context

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
      {/* Profile Link */}
      <Link
        href="/profile"
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
      >
        <FontAwesomeIcon icon={faUser} className="text-gray-500" />
        <span>Profile</span>
      </Link>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
      >
        <FontAwesomeIcon icon={faSignOutAlt} className="text-gray-500" />
        <span>Logout</span>
      </button>
    </div>
  );
};
