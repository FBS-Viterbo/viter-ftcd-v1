import React from "react";
import { StoreContext } from "../../../../../store/StoreContext";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../../../../functions/custom-hooks/queryData";
import { apiVersion, devApiUrl } from "../../../../../functions/functions-general";
import {
  setIsAdd,
  setSuccess,
  setError,
  setMessage,
} from "../../../../../store/StoreAction";
import ModalWrapperSide from "../../../../../partials/modals/ModalWrapperSide";
import { FaTimes } from "react-icons/fa";
import { Formik, Form } from "formik";
import { InputText } from "../../../../../components/form-inputs/FormInputs";
import ButtonSpinner from "../../../../../partials/spinners/ButtonSpinner";
import MessageError from "../../../../../partials/MessageError";

const ModalAddSystemUser = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [roles, setRoles] = React.useState([]);
  const queryClient = useQueryClient();

  React.useEffect(() => {
    const fetchRoles = async () => {
      const res = await fetch(`${devApiUrl}${apiVersion}/controllers/developers/settings/roles/roles.php`);
      const data = await res.json();

      if (data.success) {
        setRoles(data.data);
      }
    };

    fetchRoles();
  }, []);

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developers/settings/system-user/system.php?id=${itemEdit.system_aid}`
          : `${apiVersion}/controllers/developers/settings/system-user/system.php`,
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
    <ModalWrapperSide
      handleClose={handleClose}
      className="transition-all ease-in-out transform duration-200"
    >
      {/* header */}
      <div className="moda-header relative mb-4">
        <h3 className="text-dark text-sm">
          {itemEdit ? "Update" : "Add"} System User
        </h3>

        <button
          type="button"
          className="absolute top-0 right-4"
          onClick={handleClose}
        >
          <FaTimes />
        </button>
      </div>

      {/* body */}
      <div className="modal-body">
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={(values) => mutation.mutate(values)}
        >
          {(props) => (
            <Form className="h-full">

              <div className="modal-form-container">
                <div className="modal-container">

                  {/* name */}
                  <div className="relative mb-6">
                    <InputText
                      label="Name"
                      name="system_name"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>

                  {/* email */}
                  <div className="relative mt-5 mb-6">
                    <InputText
                      label="Email"
                      name="system_email"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>

                  {/* role */}
                  <div className="relative mt-5 mb-6">
                    <label className="text-sm text-gray-600 mb-1 block">
                      Role
                    </label>

                    <select
                      name="system_role"
                      value={props.values.system_role}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      disabled={mutation.isPending}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary"
                    >
                      <option value="">Select role</option>

                      {roles.map((role) => (
                        <option key={role.role_aid} value={role.role_name}>
                          {role.role_name}
                        </option>
                      ))}
                    </select>

                    {props.touched.system_role && props.errors.system_role && (
                      <div className="text-red-500 text-xs mt-1">
                        {props.errors.system_role}
                      </div>
                    )}
                  </div>

                  {store.error && <MessageError />}

                </div>

                {/* buttons (MATCHED STYLE) */}
                <div className="modal-action">
                  <button
                    type="submit"
                    disabled={mutation.isPending || !props.dirty}
                    className="btn-modal-submit"
                  >
                    {mutation.isPending ? (
                      <ButtonSpinner />
                    ) : itemEdit ? (
                      "Save"
                    ) : (
                      "Add"
                    )}
                  </button>

                  <button
                    type="button"
                    className="btn-modal-cancel"
                    onClick={handleClose}
                    disabled={mutation.isPending}
                  >
                    Cancel
                  </button>
                </div>

              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ModalWrapperSide>
  );
};

export default ModalAddSystemUser;