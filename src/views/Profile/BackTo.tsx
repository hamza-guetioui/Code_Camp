import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
type Props = {
  path: string;
  title: string;
};

const BackTo = ({ path, title }: Props) => {
  return (
    <Link href={path} className="flex items-center gap-2 p-1 bg-slate-100 group rounded-full absolute top-5 left-5">
      <FontAwesomeIcon
        icon={faArrowLeft}
        className="rounded-full text-sm p-2 bg-slate-300 text-gray-600 group-hover:text-gray-800 group-hover:bg-slate-500/800 transition-all duration-300 ease-in-out"
      />
      <span className="font-semibold text-gray-800 mr-2 group-hover:text-gray-600 transition-all duration-300 ease-in-out">
        {title}
      </span>
    </Link>
  );
};

export default BackTo;
