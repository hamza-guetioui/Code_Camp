"use client";
import * as React from "react";
import { IFeature } from "@/types/feature";
import DataTable from "@/components/MUI/DataTable";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 2 },
  { field: "name", headerName: "Name", flex:1 },
  { field: "code", headerName: "Code", flex:1 },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams) => (
      <RowActions id={params.row.id} />
    ),
  },
];

const FeaturesData: React.FC<{ features: IFeature[] }> = ({ features }) => {
  const { result, setSearch, message } = useSearch(features);
  return (
    <Container>
      <Search setSearch={setSearch} message={message} />
      <DataTable rows={result} columns={columns} />;
    </Container>
  );
};
export default FeaturesData;

import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Container from "@/components/container";
import useSearch from "./useSearch";
import Search from "./Search";
import Link from "next/link";
const RowActions: React.FC<{ id: string }> = ({ id }) => {


  const handleDelete = () => {
    // Implement delete logic here (e.g., call an API to delete the feature)
    console.log("Delete feature with id:", id);
  };

  return (
    <Container className="flex justify-center items-center gap-2">
      <Link href={`/dashboard/features/edit/${id}`}>
        <IconButton aria-label="edit" style={{ color: "blue" }}>
          <FontAwesomeIcon icon={faPenToSquare} className="w-5 h-5" />
        </IconButton>
      </Link>
      <IconButton
        onClick={handleDelete}
        aria-label="delete"
        style={{ color: "red" }}
      >
        <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
      </IconButton>
    </Container>
  );
};
