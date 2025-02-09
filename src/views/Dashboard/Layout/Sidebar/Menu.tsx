"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import Container from "@/components/container";
import cn from "./Menu.module.css";
type MenuProps = {
  children: React.ReactNode;
};

const Sidebar: React.FC<MenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container className={cn.sd_menu}>
      <ToggleButton
        isOpen={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      />
      <SidebarContent isOpen={isOpen}>{children}</SidebarContent>
    </Container>
  );
};

export default Sidebar;

// Toggle Button Component
const ToggleButton: React.FC<{ isOpen: boolean; onClick: () => void }> = ({
  isOpen,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={cn.sd_menu_toggle_button}
    aria-label={isOpen ? "Close Menu" : "Open Menu"}
  >
    <FontAwesomeIcon icon={isOpen ? faCaretLeft : faCaretRight} />
  </button>
);

// Sidebar Content Component
const SidebarContent: React.FC<{
  isOpen: boolean;
  children: React.ReactNode;
}> = ({ isOpen, children }) => (
  <Container
    className={`${cn.sd_menu_content} ${
      isOpen ? cn.sd_menu_content_open : cn.sd_menu_content_close
    }`}
  >
    {children}
  </Container>
);

// Overlay Component
// const Overlay: React.FC<{ onClick: () => void }> = ({ onClick }) => (
//   <button
//     onClick={onClick}
//     className="fixed top-0 left-0 inset-0 w-screen h-screen z-10 bg-black/30 lg:hidden"
//     aria-label="Close Menu"
//   />
// );
