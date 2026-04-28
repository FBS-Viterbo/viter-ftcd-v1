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
  const [searchInput, setSearchInput] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("all");

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearch(searchInput);
    }
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
        <div className="flex items-center w-full justify-between mb-3">
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

        {/* filter */}
        <div className="flex items-center justify-between mb-2 gap-2">
          <select
            className="w-32 border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:border-primary"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <input
            type="search"
            className="w-64 border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:border-primary"
            placeholder="Search here..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
        </div>

        {/* content */}
        <div>
          <SystemUserList
            itemEdit={itemEdit}
            setItemEdit={setItemEdit}
            search={search}
            filter={filter}
          />
        </div>

      </Layout>

      {store.isAdd && (
        <ModalAddSystemUser itemEdit={itemEdit} />
      )}
    </>
  );
};

export default SystemUser;