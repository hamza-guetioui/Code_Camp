"use client";
import React from "react";
import DataTable from "@/components/MUI/DataTable";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import RowActions from "./RowAction";
import useSearch from "./useSearch";
import Container from "@/components/container";
import Search from "./Search";
import { useRefresh } from "@/context/refrechContext";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    flex: 2,
    filterable: false,
    sortable: false,
  },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "code", headerName: "Code", flex: 1 },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams) => (
      <RowActions id={params.row.id} name={params.row.name} />
    ),
  },
];

const FeaturesData: React.FC = () => {
  const { response } = useRefresh();
  const { data = [] } = response;
  const { result, setSearch, message } = useSearch(data);
  return (
    <Container>
      <Search setSearch={setSearch} message={message} />
      <DataTable
        rows={result}
        columns={columns}
        loading={response.loading}
        error={response.error}
      />
    </Container>
  );
};
export default FeaturesData;
