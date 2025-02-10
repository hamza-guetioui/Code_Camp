import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Link from "next/link";

type IconMenuItemProps = {
  children: React.ReactElement; // Typing specifically for an icon or component
  label: string;
  link: string;
};

export default function IconMenuItem({
  children,
  label,
  link,
}: IconMenuItemProps) {
  return (
    <Link href={link} passHref>
      <MenuItem >
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText primary={label} />
      </MenuItem>
    </Link>
  );
}
