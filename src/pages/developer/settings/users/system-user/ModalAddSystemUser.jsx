import React from "react";
import { StoreContext } from "../../../../../store/StoreContext";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../../../../functions/custom-hooks/queryData";
import { apiVersion } from "../../../../../functions/functions-general";
import {
  setIsAdd,
  setSuccess,
  setError,
  setMessage,
} from "../../../../../store/StoreAction";
import ModalWrapperSide from "../../../../../partials/modals/ModalWrapperSide";
import { FaTimes } from "react-icons/fa";
import { Formik, Form } from "formik";
import {
  InputText,
} from "../../../../../components/form-inputs/FormInputs";
import ButtonSpinner from "../../../../../partials/spinners/ButtonSpinner";
import MessageError from "../../../../../partials/MessageError";

const ModalAddSystemUser = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developers/settings/system/system.php?id=${itemEdit.system_aid}`
          : `${apiVersion}/controllers/developers/settings/system/system.php`,
        itemEdit ? "put" : "post",
        values
      ),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["system-user"] });

      if (data.success) {
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfully ${itemEdit ? "updated" : "added"}`));
        dispatch(setIsAdd(false));
      } else {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  const initVal = {
    ...itemEdit,
    system_name: itemEdit ? itemEdit.system_name : "",
    system_email: itemEdit ? itemEdit.system_email : "",
    system_role: itemEdit ? itemEdit.system_role : "",
  };

  const yupSchema = Yup.object({
    system_name: Yup.string().required("required"),
    system_email: Yup.string().email().required("required"),
    system_role: Yup.string().required("required"),
  });

  const handleClose = () => dispatch(setIsAdd(false));

  React.useEffect(() => {
    dispatch(setError(false));
  }, []);

  return (
    <ModalWrapperSide handleClose={handleClose}>

      {/* header */}
      <div className="mb-4 flex justify-between">
        <h3 className="text-sm">
          {itemEdit ? "Update" : "Add"} System User
        </h3>
        <button onClick={handleClose}>
          <FaTimes />
        </button>
      </div>

      {/* body */}
      <Formik
        initialValues={initVal}
        validationSchema={yupSchema}
        onSubmit={(values) => mutation.mutate(values)}
      >
        {(props) => (
          <Form>

            <InputText label="Name" name="system_name" />
            <InputText label="Email" name="system_email" />
            <InputText label="Role" name="system_role" />

            {store.error && <MessageError />}

            <div className="flex gap-2 mt-5">
              <button
                type="submit"
                disabled={mutation.isPending || !props.dirty}
                className="btn-modal-submit"
              >
                {mutation.isPending ? <ButtonSpinner /> : itemEdit ? "Save" : "Add"}
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="btn-modal-cancel"
              >
                Cancel
              </button>
            </div>

          </Form>
        )}
      </Formik>

    </ModalWrapperSide>
  );
};

export default ModalAddSystemUser;