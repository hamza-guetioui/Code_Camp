"use client";
import Form from "next/form";
import { DELETE_FEATURE, IDeleteFormState } from "@/lib/actions/Feature";
import Input from "@/components/form_ui/Input";
import { useFormState, useFormStatus } from "react-dom";
import Container from "@/components/container";
import { useRefresh } from "@/context/refrechContext";
import { useEffect } from "react";
import { useAlert } from "@/context/alertContext";

const initialState: IDeleteFormState = {
  status: null,
  message: "",
};
interface DeleteFormProps {
  id: string;
  name: string;
  setOpen: () => void;
}
const DeleteForm: React.FC<DeleteFormProps> = ({ id, name, setOpen }) => {
  const { handleAlert } = useAlert();

  const [state, formAction] = useFormState<IDeleteFormState, FormData>(
    DELETE_FEATURE,
    initialState
  );
  const { pending } = useFormStatus();
  const { refreshData } = useRefresh();
  useEffect(() => {
    if (state.message && state.status) {
      if (state.status === 200) {
        refreshData();
      }
      handleAlert({ message: state.message, status: state.status });
    }
  }, [state, refreshData]);

  return (
    <Container className="fixed inset-0 z-[90] flex items-center justify-center bg-black/30 ">
      <Form
        action={formAction}
        className="max-sm:w-5/6 flex flex-col bg-white rounded-lg p-4 pt-0 lg:p-6 shadow-2xl "
      >
        <Input type="hidden" readOnly name="id" value={id} />

        <h6 className="text-2xl lg:text-xl mb-2 font-semibold text-gray-800">
          Confirm Deletion
        </h6>
        <p className="text-gray-600 text-wrap max-sm:-mt-2 leading-tight break-words">
          {`Are you sure you want to delete the feature "${name}"?`}
        </p>
        <Container className="flex justify-end gap-4 mt-4">
          {/* Submit button */}
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
            disabled={pending}
          >
            {pending ? "Deleting..." : "Delete"}
          </button>
          <button
            type="button"
            onClick={setOpen}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </Container>
      </Form>
    </Container>
  );
};

export default DeleteForm;
