"use client";

import React, { useState } from "react";
import Container from "@/components/container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useData } from "./dataContext";

const Index = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { filterState, filterDispatch } = useData();

  return (
    <Container className="relative z-30">
      <Trigger isOpen={isOpen} setIsOpen={setIsOpen} />
      <Filters isOpen={isOpen}>
        {/* <SortOptions sortState={sortState} sortDispatch={sortDispatch} /> */}
      </Filters>
      <ScreenCover isOpen={isOpen} setIsOpen={setIsOpen} />
    </Container>
  );
};

export default Index;

const ScreenCover = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      className={`${isOpen ? "fixed" : "hidden"} top-0 left-0 w-full h-full z-10 `}
      onClick={() => setIsOpen(false)}
    ></button>
  );
};

const Trigger = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      className={`${isOpen ? "bg-slate-100 text-slate-700" : "bg-transparent"} rounded-full w-8 h-8 flex justify-center items-center z-30`}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <FontAwesomeIcon
        icon={faFilter}
        className="text-slate-400 hover:text-slate-700 text-xl"
      />
    </button>
  );
};

const Filters = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`${isOpen ? "absolute top-full right-0" : "hidden"} min-w-[21rem] md:min-w-[36rem] max-w-full grid grid-cols-2 md:grid-cols-4 gap-2 p-4 mt-1 shadow-xl bg-slate-100 rounded-xl z-30 `}
    >
      {children}
    </div>
  );
};

