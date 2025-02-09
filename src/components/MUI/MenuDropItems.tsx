import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Link from "next/link";
import Container from "../container";

type MenuDropItemsProps = {
  children: React.ReactNode;
  label: string;
  options: {
    label: string;
    link: string;
  }[];
};

export default function IconMenuItem({
  children,
  label,
  options,
}: MenuDropItemsProps) {
  const [state, setState] = React.useState(false);
  return (
    <Container>
        <MenuItem onClick={() => setState(!state)}>
          <ListItemIcon>
            {children}
            {/* <ContentCut fontSize="small" /> */}
          </ListItemIcon>
          <ListItemText>{label}</ListItemText>
        </MenuItem>
      {state && (
        <DropMenu>
          {options.map((option) => (
            
            <MenuItem key={option.label}>
              <Link href={option.link}>{option.label}</Link>
            </MenuItem>
          ))}
        </DropMenu>
      )}
    </Container>
  );
}

const DropMenu = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
