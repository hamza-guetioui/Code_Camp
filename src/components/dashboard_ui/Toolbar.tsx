import React from "react";
import Container from "@/components/container";
import Link from "next/link";

interface SectionToolbarProps {
  title: string;
  create: string;
  children?: React.ReactNode;
}

const SectionToolbar: React.FC<SectionToolbarProps> = ({ title, create, children }) => {
  return (
    <Container className="flex items-center justify-between py-3 px-4 bg-gray-200 rounded-lg shadow-sm">
      <Title>{title}</Title>
      <Container className="flex items-center gap-2">
        {children && <> {children}</>}
        <CreateNew path={create} />
      </Container>
    </Container>
  );
};

export default SectionToolbar;

export const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <h1 className="text-2xl font-semibold font-serif text-gray-800">{children}</h1>;
};

const CreateNew: React.FC<{ path: string }> = ({ path }) => {
  return (
    <Link
      href={path}
      aria-label="Create new item"
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded transition duration-200"
    >
      Create New
    </Link>
  );
};
