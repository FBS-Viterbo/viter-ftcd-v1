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

const ModalAddCategory = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developers/settings/category/category.php?id=${itemEdit.category_aid}`
          : `${apiVersion}/controllers/developers/settings/category/category.php`,
        itemEdit ? "put" : "post",
        values
      ),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["category"] });

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
    category_name: itemEdit ? itemEdit.category_name : "",
    category_description: itemEdit ? itemEdit.category_description : "",
  };

  const yupSchema = Yup.object({
    category_name: Yup.string().required("required"),
    category_description: Yup.string().required("required"),
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
          {itemEdit ? "Update" : "Add"} Category
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
                      name="category_name"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>

                  {/* description */}
                  <div className="relative mt-5 mb-6">
                    <InputText
                      label="Description"
                      name="category_description"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>

                  {store.error && <MessageError />}

                </div>

                {/* buttons */}
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

export default ModalAddCategory;