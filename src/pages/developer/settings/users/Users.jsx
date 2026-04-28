import React from "react";
import Layout from "../../Layout";
import { FaUserCircle, FaChevronRight } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { devNavUrl, urlDeveloper } from "../../../../functions/functions-general";
import { IoArrowBack } from "react-icons/io5";

const Users = () => {
  const navigate = useNavigate();
  const base = `${devNavUrl}/${urlDeveloper}`;

  const items = [
    { label: "System user", path: `${base}/settings/users/system-user` },
    { label: "Other user", path: `${base}/settings/users/other-user` },
    { label: "Roles", path: `${base}/settings/users/role` },
  ];

  return (
    <Layout menu="settings">
      <div className="flex items-center gap-2 mb-5 text-sm text-gray-500">
        <IoArrowBack className="text-black font-bold size-5" />
        <Link to={`${base}/settings/users`} className="text-primary hover:underline">
          Settings
        </Link>
        <span>&gt;</span>
        <span>Users</span>
      </div>

      <h1 className="text-xl font-bold mb-4">Users</h1>

      <div className="bg-white">
        {items.map((item, idx) => (
          <button
            key={idx}
            className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 border-b border-gray-200 text-sm cursor-pointer"
            onClick={() => navigate(item.path)}
          >
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-black text-lg" />
              <span className="text-black font-bold">{item.label}</span>
            </div>
            <FaChevronRight className="text-gray-400 text-xs" />
          </button>
        ))}
      </div>
    </Layout>
  );
};

export default Users;
