import React from "react";
import { StoreContext } from "../../../store/StoreContext";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../../functions/custom-hooks/queryData";
import { apiVersion } from "../../../functions/functions-general";

import {
  setIsAdd,
  setSuccess,
  setError,
  setMessage,
} from "../../../store/StoreAction";

import ModalWrapperSide from "../../../partials/modals/ModalWrapperSide";
import { FaTimes } from "react-icons/fa";
import { Formik, Form } from "formik";

import {
  InputText,
  InputTextArea,
  InputCheckbox,
} from "../../../components/form-inputs/FormInputs";

import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import MessageError from "../../../partials/MessageError";

const ModalAddChildren = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developers/children/children.php?id=${itemEdit.children_aid}`
          : `${apiVersion}/controllers/developers/children/children.php`,
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["children"] });

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
    children_is_active: itemEdit ? itemEdit.children_is_active == 1 : false,
    children_full_name: itemEdit ? itemEdit.children_full_name : "",
    children_birthday: itemEdit ? itemEdit.children_birthday : "",
    children_story: itemEdit ? itemEdit.children_story : "",
    children_donation_amount_limit: itemEdit
      ? itemEdit.children_donation_amount_limit
      : 0,
    children_is_residence: itemEdit
      ? itemEdit.children_is_residence == 1
      : false,
    children_full_name_old: itemEdit ? itemEdit.children_full_name : "",
  };

  const yupSchema = Yup.object({
    children_full_name: Yup.string().trim().required("Required"),
    children_birthday: Yup.string().required("Required"),
    children_story: Yup.string().trim().required("Required"),
    children_donation_amount_limit: Yup.number().required("Required"),
  });

  const handleClose = () => dispatch(setIsAdd(false));

  React.useEffect(() => {
    dispatch(setError(false));
  }, []);

  return (
    <ModalWrapperSide handleClose={handleClose}>
      <div className="modal-header relative mb-4">
        <h3 className="text-dark font-bold text-sm">
          {itemEdit ? "Update" : "Add"} Children
        </h3>

        <button
          type="button"
          className="absolute top-0 right-0"
          onClick={handleClose}
        >
          <FaTimes />
        </button>
      </div>

      <div className="modal-body">
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={(values) => {
            dispatch(setError(false));
            mutation.mutate(values);
          }}
        >
          {(props) => (
            <Form className="h-full">
              <div className="modal-form-container">
                <div className="modal-container">

                  <div className="relative mb-6">
                    <InputCheckbox
                      label="Active"
                      name="children_is_active"
                      disabled={mutation.isPending}
                    />
                  </div>

                  <div className="relative mb-6">
                    <InputText
                      label="Full Name"
                      name="children_full_name"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>

                  <div className="relative mb-6">
                    <InputText
                      label="Birthday"
                      name="children_birthday"
                      type="date"
                      disabled={mutation.isPending}
                    />
                  </div>

                  <div className="relative mb-6">
                    <InputTextArea
                      label="My Story"
                      name="children_story"
                      disabled={mutation.isPending}
                    />
                  </div>

                  <div className="relative mb-6">
                    <InputText
                      label="Donation Amount Limit"
                      name="children_donation_amount_limit"
                      type="number"
                      disabled={mutation.isPending}
                    />
                  </div>

                  <div className="relative mb-6">
                    <InputCheckbox
                      label="Mark Check If Residence"
                      name="children_is_residence"
                      disabled={mutation.isPending}
                      className="accent-orange-500"
                    />
                  </div>

                  {store.error && <MessageError />}
                </div>

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
                    type="reset"
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

export default ModalAddChildren;