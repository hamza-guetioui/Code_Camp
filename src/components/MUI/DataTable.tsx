"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { IFeature } from "@/types/feature";

interface ITableProps {
  columns: GridColDef[];
  rows: IFeature[];  // ✅ Change this from IFeature to IFeature[]
}

const paginationModel = { page: 0, pageSize: 5 };

const DataTable: React.FC<ITableProps> = ({ rows, columns }) => {    
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        disableRowSelectionOnClick
        hideFooterSelectedRowCount
      />
    </Paper>
  );
};

export default DataTable;