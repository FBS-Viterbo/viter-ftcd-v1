import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../../../functions/custom-hooks/queryData";
import { apiVersion, devApiUrl } from "../../../../functions/functions-general";
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

const ModalAddDesignation = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  // CATEGORY LIST
  const { data: categoryData } = useQueryData(
    `${apiVersion}/controllers/developers/settings/category/category.php`,
    "get",
    "category"
  );

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developers/settings/designation/designation.php?id=${itemEdit.designation_aid}`
          : `${apiVersion}/controllers/developers/settings/designation/designation.php`,
        itemEdit ? "put" : "post",
        values
      ),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["designation"] });

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
    designation_name: itemEdit ? itemEdit.designation_name : "",
    designation_category: itemEdit ? itemEdit.designation_category : "",
  };

  const yupSchema = Yup.object({
    designation_name: Yup.string().required("required"),
    designation_category: Yup.string().required("required"),
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
          {itemEdit ? "Update" : "Add"} Designation
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
                      name="designation_name"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>

                  {/* CATEGORY */}
                  <div className="relative mt-5 mb-6">
                    <label className="text-sm text-gray-600 mb-1 block">
                      Category
                    </label>

                    <select
                      name="designation_category"
                      value={props.values.designation_category}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      disabled={mutation.isPending}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary"
                    >
                      <option value="">Select category</option>

                      {categoryData?.data?.map((cat) => (
                        <option
                          key={cat.category_aid}
                          value={cat.category_name}
                        >
                          {cat.category_name}
                        </option>
                      ))}
                    </select>

                    {props.touched.designation_category &&
                      props.errors.designation_category && (
                        <div className="text-red-500 text-xs mt-1">
                          {props.errors.designation_category}
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

export default ModalAddDesignation;