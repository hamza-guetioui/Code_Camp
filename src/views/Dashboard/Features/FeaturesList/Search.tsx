import Input from "@/components/auth_ui/Input";
import Container from "@/components/container";
import React from "react";

type SearchProps = { setSearch: (value: string) => void; message: string };

const Search : React.FC<SearchProps> = ({ setSearch, message }) => {
  return (
    <Container className="relative mt-4 mb-8 ">
        <Input
          type="text"
          placeholder="Search Features..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />

      {message && (
        <p className="mb-4 ml-2 font-semibold text-red-400 absolute top-full left-0">{message}</p>
      )}
    </Container>
  );
};

export default Search;
