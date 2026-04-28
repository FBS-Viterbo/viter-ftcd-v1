import React from "react";
import useQueryData from "../../../../../functions/custom-hooks/useQueryData";
import { apiVersion, formatDate } from "../../../../../functions/functions-general";
import NoData from "../../../../../partials/NoData";
import FetchingSpinner from "../../../../../partials/spinners/FetchingSpinner";
import TableLoading from "../../../../../partials/TableLoading";
import { FaEdit, FaArchive, FaTrash, FaTrashRestore } from "react-icons/fa";
import { StoreContext } from "../../../../../store/StoreContext";
import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "../../../../../store/StoreAction";
import Status from "../../../../../partials/Status";
import ModalArchive from "../../../../../partials/modals/ModalArchive";
import ModalRestore from "../../../../../partials/modals/ModalRestore";
import ModalDelete from "../../../../../partials/modals/ModalDelete";

const SystemUserList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const {
    isLoading,
    isFetching,
    data: dataSystem,
  } = useQueryData(
    `${apiVersion}/controllers/developers/settings/system-user/system.php`,
    "get",
    "system-user"
  );

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleArchive = (item) => {
    dispatch(setIsArchive(true));
    setItemEdit(item);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setItemEdit(item);
  };

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setItemEdit(item);
  };

  return (
    <>
      <div className="relative pt-4">

        {isFetching && !isLoading && <FetchingSpinner />}

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="100%">
                  <TableLoading cols={6} count={10} />
                </td>
              </tr>
            ) : dataSystem?.count === 0 ? (
              <tr>
                <td colSpan="100%">
                  <NoData />
                </td>
              </tr>
            ) : (
              dataSystem?.data.map((item, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>

                  <td>
                    <Status text={item.system_is_active == 1 ? "active" : "inactive"} />
                  </td>

                  <td>{item.system_name}</td>
                  <td>{item.system_email}</td>
                  <td>{item.system_role}</td>
                  <td>{formatDate(item.system_created, "--", "short-date")}</td>

                  <td>
                    <div className="flex gap-3">

                      {item.system_is_active == 1 ? (
                        <>
                          <button onClick={() => handleEdit(item)}>
                            <FaEdit />
                          </button>

                          <button onClick={() => handleArchive(item)}>
                            <FaArchive />
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleRestore(item)}>
                            <FaTrashRestore />
                          </button>

                          <button onClick={() => handleDelete(item)}>
                            <FaTrash />
                          </button>
                        </>
                      )}

                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {store.isArchive && (
        <ModalArchive
          mysqlApiArchive={`${apiVersion}/controllers/developers/settings/system-user/active.php?id=${store.itemEdit?.system_aid}`}
          msg="Archive this user?"
          queryKey="system-user"
          item={store.itemEdit?.system_name}
        />
      )}

      {store.isRestore && (
        <ModalRestore
          mysqlApiRestore={`${apiVersion}/controllers/developers/settings/system-user/active.php?id=${store.itemEdit?.system_aid}`}
          msg="Restore this user?"
          queryKey="system-user"
          item={store.itemEdit?.system_name}
        />
      )}

      {store.isDelete && (
        <ModalDelete
          mysqlApiDelete={`${apiVersion}/controllers/developers/settings/system-user/system.php?id=${store.itemEdit?.system_aid}`}
          msg="Delete this user?"
          queryKey="system-user"
          item={store.itemEdit?.system_name}
        />
      )}
    </>
  );
};

export default SystemUserList;