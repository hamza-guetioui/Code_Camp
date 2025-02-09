"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faUser } from "@fortawesome/free-solid-svg-icons";
import Container from "@/components/container";
import Image from "next/image";
import { IUser } from "@/types/user";

interface ProfileButtonProps {
  onClick: () => void;
  user: IUser | null;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ onClick, user }) => {
  return (
    <Container>
      <button
        onClick={onClick}
        className="flex items-center justify-center gap-2"
      >
        <FullName fullName={user?.fullName} />
        <Picture pictureUrl={user?.profilePicture} />
        <FontAwesomeIcon
          icon={faCaretDown}
          className="text-xl hover:text-gray-800 hover:scale-110 transition-all duration-200 mt-1"
        />
      </button>
    </Container>
  );
};

export default ProfileButton;

const FullName = ({ fullName }: { fullName?: string }) => {
  return (
    <>
      {fullName && <h3 className="font-semibold max-sm:hidden">{fullName}</h3>}
    </>
  );
};
const Picture = ({ pictureUrl }: { pictureUrl?: string | null }) => {
  return (
    <Container className="flex justify-center items-center w-10 h-10 rounded-full overflow-hidden border-2 bg-gray-200 border-gray-300/700 p-4">
      {pictureUrl ? (
        <Image
          src={pictureUrl}
          alt="Profile"
          className="object-cover w-full h-full"
        />
      ) : (
        <FontAwesomeIcon icon={faUser} className="text-xl" />
      )}
    </Container>
  );
};
