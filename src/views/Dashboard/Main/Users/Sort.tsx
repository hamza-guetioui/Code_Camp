"use client";

import React from "react";
import Container from "@/components/container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { useData } from "./dataContext";
import { SortActionTypes, SortStateTypes } from "./Hooks/useSort";

const Index = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { sortState: state, sortDispatch: dispatch } = useData();

  return (
    <Container className="relative z-50">
      <Trigger isOpen={isOpen} setIsOpen={setIsOpen} />
      <Sorts isOpen={isOpen}>
        <SortOptions sortState={state} sortDispatch={dispatch} />
      </Sorts>
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
      className={`${
        isOpen ? "fixed" : "hidden"
      } top-0 left-0 w-full h-full z-20`}
      onClick={() => setIsOpen(false)}
    />
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
      className={`${
        isOpen ? "bg-slate-50/70 text-slate-700" : "bg-transparent"
      } rounded-full w-8 h-8 flex justify-center items-center`}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <FontAwesomeIcon
        icon={faSort}
        className="text-slate-400 hover:text-slate-700 text-xl z-10"
      />
    </button>
  );
};

const Sorts = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Container
      className={`${
        isOpen ? "absolute top-full right-0" : "hidden"
      } w-52 block p-4 mt-1 shadow-xl bg-slate-100 rounded-xl`}
    >
      {children}
    </Container>
  );
};

// Sort Options Component
const SortOptions = ({
  sortState,
  sortDispatch,
}: {
  sortState: SortStateTypes; // Replace with the proper type for your sort state
  sortDispatch: React.Dispatch<SortActionTypes>; // Replace with the proper type for your dispatch
}) => {
  return (
    <div className="flex flex-col gap-2 w-48">
      <button
        className={`${
          sortState.AlphaAsc
            ? "bg-blue-500 text-white"
            : "bg-transparent text-blue-500"
        } py-2 px-4 rounded-md`}
        onClick={() => sortDispatch({ type: "SET_ALPHA_ASC", payload: true })}
      >
        Ascending
      </button>
      <button
        className={`${
          sortState.AlphaDesc
            ? "bg-red-500 text-white"
            : "bg-transparent text-red-500"
        } py-2 px-4 rounded-md`}
        onClick={() => sortDispatch({ type: "SET_ALPHA_DESC", payload: true })}
      >
        Descending
      </button>
    </div>
  );
};
