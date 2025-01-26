"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Container from "@/components/container";

type Props = {
  children: React.ReactNode;
};

const Navbar = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <Container className="flex lg:justify-center order-1 lg:order-2">
      {/* Hamburger Button (Mobile Only) */}
      <HamburgerButton onClick={toggleMenu} />

      {/* Navbar Wrapper (Modal for Mobile) */}
      <NavbarWrapper isOpen={isOpen} onClose={closeMenu}>
        {children}
      </NavbarWrapper>
    </Container>
  );
};

export default Navbar;

// Hamburger Button Component
const HamburgerButton = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className="lg:hidden" aria-label="Open Menu">
    <FontAwesomeIcon
      icon={faBars}
      className="flex text-3xl items-center justify-center p-2 rounded-full hover:bg-slate-100/30"
    />
  </button>
);

// Close Button Component
const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="absolute top-3 right-3 flex items-center justify-center text-slate-200 w-6 h-6 bg-slate-500/30 rounded-full hover:bg-slate-500/60 lg:hidden"
    aria-label="Close Menu"
  >
    <FontAwesomeIcon icon={faXmark} />
  </button>
);

// Navbar Wrapper Component
const NavbarWrapper = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Container
      className={`max-md:fixed top-0 left-0 flex w-full max-md:h-screen max-md:bg-black/20  max-md:z-50
   ${isOpen ? "max-md:block" : "max-md:hidden"} `}
    >
      <Container
        className={`relative max-md:max-w-[80%] max-md:border-r-2 max-md:border-slate-100/50 max-md:bg-slate-200 max-md:rounded-tr-[.1rem] max-md:rounded-br-[.1rem]  
max-md:pt-10 max-md:px-0 max-md:overflow-y-scroll max-md:h-screen max-md:max-h-screen max-md:overflow-x-hidden 
transform transition-transform duration-700 ease-in-out 
${isOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full"}`}
      >
        <CloseButton onClick={onClose} />
        {children}
      </Container>
      <ScreenCloseTrigger onClick={onClose} />
    </Container>
  );
};

// Screen Close Trigger Component
const ScreenCloseTrigger = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="absolute inset-0 w-full h-full z-10 lg:hidden"
    aria-label="Close Menu"
  />
);
