import React from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";

interface IconMenuProps {
  readonly children: React.ReactNode;
}

export default function IconMenu({ children }: IconMenuProps) {
  return (
    <Paper sx={{ width: 320, maxWidth: "100%" }}>
      <MenuList>{children}</MenuList>
    </Paper>
  );
}