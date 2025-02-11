"use client";
import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { IFeature } from "@/types/feature";
import { Box, Typography } from "@mui/material";

interface ITableProps {
  columns: GridColDef[];
  rows: IFeature[];
  loading?: boolean;
  error?: string | null;
}

const paginationModel = { page: 0, pageSize: 5 };

// No Data or Error Component
const NoRowsOverlay = ({ error }: { error?: string | null }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
    }}
  >
    <Typography color={error ? "error" : "textPrimary"}>
      {error || "No Data Available"}
    </Typography>
  </Box>
);

const DataTable: React.FC<ITableProps> = ({ rows, columns, loading, error }) => {
  return (
    <Paper sx={{ flexGrow: 1, minHeight: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading} // MUI's built-in loading indicator
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{
          border: 0,
          minHeight: 400,
          "& .MuiDataGrid-virtualScroller": {
            minHeight: "calc(100% - 52px)",
          },
          "& .MuiDataGrid-topContainer": {
            zIndex: 0,
          },
        }}
        disableRowSelectionOnClick
        hideFooterSelectedRowCount
        slots={{
          noRowsOverlay: () => <NoRowsOverlay error={error} />,
        }}
      />
    </Paper>
  );
};

export default DataTable;
