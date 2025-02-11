import Container from "@/components/container";
import React from "react";

type Props = {
  data: {
    title: string;
    description: string;
    value: string;
    format: string;
  };
};

const Box = ({ data }: Props) => {
  return (
    <Container className="p-2 rounded-md min-w-64 bg-slate-100  border-slate-200/70 shadow-md shadow-slate-300">
      <h2 className="text-lg font-bold text-slate-600">{data.title}</h2>

      <Container className="flex items-end gap-2">
        <p className="text-4xl font-bold text-slate-700">{data.value}</p>
        <span className="text-base font-semibold text-slate-500">{data.format}</span>
      </Container>
      <p className="text-sm  font-semibold text-slate-400 mt-1 ml-1">{data.description}</p>
    </Container>
  );
};

export default Box;
