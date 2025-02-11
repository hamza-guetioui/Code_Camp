import { useState } from "react";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import Container from "@/components/container";
import DeleteForm from "./DeleteForm";

interface RowActionsProps {
  id: string;
  name: string;
}

const RowActions: React.FC<RowActionsProps> = ({ id, name }) => {
  const [isDeleteFormOpen, setIsDeleteFormOpen] = useState(false);

  const toggleDeleteForm = () => {
    setIsDeleteFormOpen((prev) => !prev);
  };

  return (
    <Container className="flex justify-center items-center gap-2">
      {/* Edit Button */}
      <Link href={`/dashboard/features/edit/${id}`} passHref>
        <IconButton aria-label="Edit Feature" >
          <FontAwesomeIcon icon={faPenToSquare} className="w-5 h-5 text-blue-500" />
        </IconButton>
      </Link>

      {/* Delete Button */}
      <IconButton
        onClick={toggleDeleteForm}
        aria-label="Delete Feature"
      >
        <FontAwesomeIcon icon={faTrash} className="w-5 h-5 text-red-500" />
      </IconButton>

      {/* Delete Confirmation Form */}
      {isDeleteFormOpen && (
        <DeleteForm id={id} name={name} setOpen={() => setIsDeleteFormOpen(false)} />
      )}
    </Container>
  );
};

export default RowActions;