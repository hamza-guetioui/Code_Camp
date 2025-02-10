import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Link from "next/link";
import Container from "../container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@mui/material";
import {
  faAdd,
  faCaretDown,
  faCaretRight,
  faList,
} from "@fortawesome/free-solid-svg-icons";

type MenuGroupItemsProps = {
  children: React.ReactElement; // Typing children as a single React element (e.g., icon)
  label: string;
  options: {
    label: string;
    link: string;
    type: string;
  }[];
};

export default function MenuGroupItems({
  children,
  label,
  options,
}: MenuGroupItemsProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <Container>
      <MenuItem onClick={toggleDropdown}>
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText primary={label} />
        <Typography>
          <FontAwesomeIcon icon={isOpen ? faCaretDown : faCaretRight} />
        </Typography>
      </MenuItem>
      {isOpen && <DropMenu options={options} />}{" "}
      {/* Conditional rendering for dropdown */}
    </Container>
  );
}

const DropMenu: React.FC<{ options: MenuGroupItemsProps["options"] }> = ({
  options,
}) => (
  <Container className="pl-9">
    {options.map((option) => (
      <Link  key={option.label} href={option.link} passHref>
               <MenuItem>
          <ListItemIcon>
            <FontAwesomeIcon icon={option.type === "list" ? faList : faAdd} />
          </ListItemIcon>
          <ListItemText primary={option.label} />
        </MenuItem>
   
      </Link>
    ))}
  </Container>
);
