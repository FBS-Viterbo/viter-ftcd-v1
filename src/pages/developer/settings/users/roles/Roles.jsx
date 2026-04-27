import React from "react";
import Layout from "../../../Layout";
import RolesList from "./RolesList";
import { setIsAdd } from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { devNavUrl, urlDeveloper } from "../../../../../functions/functions-general";
import ModalAddRoles from "./ModalAddRoles";

const Roles = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  return (
    <>
      <Layout menu="settings" submenu="roles">
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
          <span>Role</span>
        </div>
        {/* page header */}
        <div className="flex items-center w-full justify-between">
          <h1>Roles</h1>
          <div>
            <button
              type="button"
              className="flex items=center gap-1 hover:underline"
              onClick={handleAdd}
            >
              <FaPlus className="text-primary" />
              Add
            </button>
          </div>
        </div>
        {/* page content */}
        <div>
          <RolesList itemEdit={itemEdit} setItemEdit={setItemEdit} />
        </div>
      </Layout>
      {store.isAdd && <ModalAddRoles itemEdit={itemEdit} />}
    </>
  );
};

export default Roles;
