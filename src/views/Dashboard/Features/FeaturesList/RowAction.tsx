import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Container from "@/components/container";

import Link from "next/link";
import DeleteForm from "./DeleteForm";
import { useState } from "react";

const RowActions: React.FC<{ id: string; name: string }> = ({ id, name }) => {
  const [open, setOpen] = useState(false);
  const handleDelete = () => {
    setOpen((prev) => !prev);
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
      {open && (
        <DeleteForm id={id} name={name} setOpen={() => setOpen(false)} />
      )}
    </Container>
  );
};

export default RowActions;
