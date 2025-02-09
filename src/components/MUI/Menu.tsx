import * as React from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";

// import Typography from "@mui/material/Typography";

export default function IconMenu({ children }: { children: React.ReactNode }) {
  return (
    <Paper sx={{ width: 320, maxWidth: "100%" }}>
      <MenuList>
        {children}
      </MenuList>
    </Paper>
  );
}
