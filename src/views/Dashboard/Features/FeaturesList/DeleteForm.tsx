"use client";
import Form from "next/form";
import { DELETE_FEATURE, IDeleteFormState } from "@/lib/actions/Feature";
import Input from "@/components/auth_ui/Input";
import { useFormState, useFormStatus } from "react-dom";
import Container from "@/components/container";
import FormStatePopup from "@/components/auth_ui/FormStatePopup";

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
  const [state, formAction] = useFormState<IDeleteFormState, FormData>(
    DELETE_FEATURE,
    initialState
  );
  const { pending } = useFormStatus();

  return (
    <Form
      action={formAction}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
    >
      <Input type="hidden" readOnly name="id" value={id} />

      <Container className="bg-white rounded-lg p-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Confirm Deletion
          </h2>
          <p className="mt-2 text-gray-600">
            {`Are you sure you want to delete the feature ${name}"?`}
          </p>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          {/* Submit button */}
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
            disabled={pending}
            // onClick={setOpen}
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
        </div>
      </Container>
      {/* A popup displays the returned form state message for both success and error cases */}
      {state.message && <FormStatePopup state={state} />}
    </Form>
  );
};

export default DeleteForm;
