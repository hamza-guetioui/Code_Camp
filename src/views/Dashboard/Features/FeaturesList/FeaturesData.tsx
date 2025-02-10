"use client";
import * as React from "react";
import { IFeature } from "@/types/feature";
import DataTable from "@/components/MUI/DataTable";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import RowActions from "./RowAction";
import useSearch from "./useSearch";
import Container from "@/components/container";
import Search from "./Search";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 2 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "code", headerName: "Code", flex: 1 },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams) => (
      <RowActions id={params.row.id} name={params.row.name} />
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
