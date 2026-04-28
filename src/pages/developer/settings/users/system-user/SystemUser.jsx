import React from "react";
import Layout from "../../../Layout";
import { setIsAdd } from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { devNavUrl, urlDeveloper } from "../../../../../functions/functions-general";
import ModalAddSystemUser from "./ModalAddSystemUser";
import SystemUserList from "./SystemUserList";

const SystemUser = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Layout menu="settings" submenu="system-user">

        {/* breadcrumb */}
        <div className="flex items-center gap-2 mb-5 text-sm text-gray-500">
          <Link to={`${devNavUrl}/${urlDeveloper}/settings/users`} className="text-primary hover:underline">
            Settings
          </Link>
          <span>&gt;</span>
          <Link to={`${devNavUrl}/${urlDeveloper}/settings/users`} className="text-primary hover:underline">
            Users
          </Link>
          <span>&gt;</span>
          <span>System</span>
        </div>

        {/* header */}
        <div className="flex items-center w-full justify-between">
          <h1>System Users</h1>

          <button
            type="button"
            className="flex items-center gap-1 hover:underline"
            onClick={handleAdd}
          >
            <FaPlus className="text-primary" />
            Add
          </button>
        </div>

        {/* content */}
        <div>
          <SystemUserList itemEdit={itemEdit} setItemEdit={setItemEdit} />
        </div>

      </Layout>

      {store.isAdd && (
        <ModalAddSystemUser itemEdit={itemEdit} />
      )}
    </>
  );
};

export default SystemUser;