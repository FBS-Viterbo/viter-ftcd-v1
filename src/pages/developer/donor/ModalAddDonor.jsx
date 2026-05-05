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

const ModalAddDonor = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developers/donor/donor.php?id=${itemEdit.donor_aid}`
          : `${apiVersion}/controllers/developers/donor/donor.php`,
        itemEdit ? "put" : "post",
        values,
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["donors"] });
      if (data.success) {
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfully ${itemEdit ? "updated" : "added"}`));
        dispatch(setIsAdd(false));
      }
      if (data.success == false) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  // const initVal = {
  //   donor_is_active: itemEdit ? itemEdit.donor_is_active == 1 : false,
  //   donor_first_name: itemEdit ? itemEdit.donor_first_name : "",
  //   donor_last_name: itemEdit ? itemEdit.donor_last_name : "",
  //   donor_email: itemEdit ? itemEdit.donor_email : "",
  //   donor_contact: "",
  //   donor_address: "",
  //   donor_city: "",
  //   donor_state: "",
  //   donor_country: "",
  //   donor_zip: "",
  //   donor_first_name_old: itemEdit ? itemEdit.donor_first_name : "",
  // };

  const initVal = {
    donor_is_active: itemEdit ? itemEdit.donor_is_active == 1 : false,

    donor_first_name: itemEdit ? itemEdit.donor_first_name : "asdfsf",
    donor_last_name: itemEdit ? itemEdit.donor_last_name : "asfasf",

    donor_email: itemEdit
      ? itemEdit.donor_email
      : "jeremyviterbo19@gmail.com",

    donor_contact: "123",
    donor_address: "qerw",
    donor_city: "qwer",
    donor_state: "qwer",
    donor_country: "qwer",
    donor_zip: "4002",

    donor_first_name_old: itemEdit ? itemEdit.donor_first_name : "",
  };

  const yupSchema = Yup.object({
    donor_first_name: Yup.string().trim().required("Required"),
    donor_email: Yup.string()
      .trim()
      .email("Invalid email")
      .required("Required"),
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
      <div className="modal-header relative mb-4">
        <h3 className="text-dark font-bold text-sm">
          {itemEdit ? "Update" : "Add"} Donor
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
          onSubmit={async (values) => {
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
                      name="donor_is_active"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="relative mb-6">
                    <InputText
                      label="Full Name"
                      name="donor_first_name"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="relative mb-6">
                    <InputText
                      label="Email"
                      name="donor_email"
                      type="email"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="relative mb-6">
                    <InputText
                      label="Contact Number"
                      name="donor_contact"
                      type="text"
                      disabled={mutation.isPending}
                      required={false}
                    />
                  </div>
                  <div className="relative mb-6">
                    <InputTextArea
                      label="Address"
                      name="donor_address"
                      disabled={mutation.isPending}
                      required={false}
                    />
                  </div>
                  <div className="relative mb-6">
                    <InputText
                      label="City"
                      name="donor_city"
                      type="text"
                      disabled={mutation.isPending}
                      required={false}
                    />
                  </div>
                  <div className="relative mb-6">
                    <InputText
                      label="State/Province"
                      name="donor_state"
                      type="text"
                      disabled={mutation.isPending}
                      required={false}
                    />
                  </div>
                  <div className="relative mb-6">
                    <InputText
                      label="Country"
                      name="donor_country"
                      type="text"
                      disabled={mutation.isPending}
                      required={false}
                    />
                  </div>
                  <div className="relative mb-6">
                    <InputText
                      label="Zip"
                      name="donor_zip"
                      type="text"
                      disabled={mutation.isPending}
                      required={false}
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

export default ModalAddDonor;
