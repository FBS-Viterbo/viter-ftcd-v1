import React from "react";
import Layout from "../Layout";
import { FaPlus } from "react-icons/fa";
import { StoreContext } from "../../../store/StoreContext";
import { setIsAdd } from "../../../store/StoreAction";
import DonorList from "./DonorList";
import ModalAddDonor from "./ModalAddDonor";

const Donor = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Layout menu="donorList">
        <div className="flex items-center w-full justify-between mb-4">
          <h1 className="text-lg font-bold">Donor List</h1>
          <button
            type="button"
            className="flex items-center gap-1 text-primary hover:underline text-sm"
            onClick={handleAdd}
          >
            <FaPlus />
            Add
          </button>
        </div>
        <DonorList itemEdit={itemEdit} setItemEdit={setItemEdit} />
      </Layout>
      {store.isAdd && (
        <ModalAddDonor itemEdit={itemEdit} />
      )}
    </>
  );
};

export default Donor;
