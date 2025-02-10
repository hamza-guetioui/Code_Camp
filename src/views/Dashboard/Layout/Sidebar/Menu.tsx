"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import Container from "@/components/container";
import cn from "./Menu.module.css";
type MenuProps = {
  children: React.ReactNode;
};

const Menu: React.FC<MenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Overlay onClick={() => setIsOpen(false)} isOpen={isOpen}>
      <Container className={cn.sd_menu}>
        <ToggleButton
          isOpen={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        />
        <SidebarContent isOpen={isOpen}>{children}</SidebarContent>
      </Container>
    </Overlay>
  );
};

export default Menu;

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
const Overlay: React.FC<{
    onClick: () => void;
    children: React.ReactNode;
    isOpen: boolean;
  }> = ({ onClick, isOpen, children }) => {
  
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClick(); // Only triggers when clicking on the overlay, not children
      }
    };
  
    return (
      <Container
        onClick={handleClick} // Handle click only on overlay
        className={`overlay ${
          isOpen
            ? "max-md:fixed max-md:top-0 max-md:left-0 max-md:inset-0 max-md:w-screen max-md:h-screen max-md:bg-black/30"
            : ""
        }`}
      >
        {children}
      </Container>
    );
  };