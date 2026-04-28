import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../../../functions/custom-hooks/queryData";
import { apiVersion } from "../../../../functions/functions-general";
import {
  setIsAdd,
  setSuccess,
  setError,
  setMessage,
} from "../../../../store/StoreAction";

import ModalWrapperSide from "../../../../partials/modals/ModalWrapperSide";
import { FaTimes } from "react-icons/fa";
import { Formik, Form } from "formik";
import { InputText } from "../../../../components/form-inputs/FormInputs";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import MessageError from "../../../../partials/MessageError";

import useQueryData from "../../../../functions/custom-hooks/useQueryData";

const ModalAddNotification = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const PURPOSE_OPTIONS = [
    "For New Donor",
    "For Donation Receipt",
    "For Contact Us",
    "For FAQ",
  ];

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developers/settings/notification/notification.php?id=${itemEdit.notification_aid}`
          : `${apiVersion}/controllers/developers/settings/notification/notification.php`,
        itemEdit ? "put" : "post",
        values
      ),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notification"] });

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
    notification_name: itemEdit ? itemEdit.notification_name : "",
    notification_email: itemEdit ? itemEdit.notification_email : "",
    notification_phone: itemEdit ? itemEdit.notification_phone : "",
    notification_purpose: itemEdit ? itemEdit.notification_purpose : "",
  };

  const yupSchema = Yup.object({
    notification_name: Yup.string().required("required"),
    notification_email: Yup.string().email().required("required"),
    notification_phone: Yup.string().required("required"),
    notification_purpose: Yup.string().required("required"),
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
          {itemEdit ? "Update" : "Add"} Notification
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
          enableReinitialize
          onSubmit={(values) => mutation.mutate(values)}
        >
          {(props) => (
            <Form className="h-full">

              <div className="modal-form-container">
                <div className="modal-container">

                  {/* NAME */}
                  <div className="relative mb-6">
                    <InputText
                      label="Name"
                      name="notification_name"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="relative mt-5 mb-6">
                    <InputText
                      label="Email"
                      name="notification_email"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>

                  {/* PHONE */}
                  <div className="relative mt-5 mb-6">
                    <InputText
                      label="Phone"
                      name="notification_phone"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>

                  {/* PURPOSE DROPDOWN */}
                  <div className="relative mt-5 mb-6">
                    <label className="text-sm text-gray-600 mb-1 block">
                      Purpose
                    </label>

                    <select
                      name="notification_purpose"
                      value={props.values.notification_purpose}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      disabled={mutation.isPending}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary"
                    >
                      <option value="">Select purpose</option>

                      {PURPOSE_OPTIONS.map((item, idx) => (
                        <option key={idx} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>

                    {props.touched.notification_purpose &&
                      props.errors.notification_purpose && (
                        <div className="text-red-500 text-xs mt-1">
                          {props.errors.notification_purpose}
                        </div>
                      )}
                  </div>

                  {store.error && <MessageError />}

                </div>

                {/* buttons (UNCHANGED STYLE) */}
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

export default ModalAddNotification;