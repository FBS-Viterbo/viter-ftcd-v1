import React from "react";
import useQueryData from "../../../../functions/custom-hooks/useQueryData";
import { apiVersion } from "../../../../functions/functions-general";
import NoData from "../../../../partials/NoData";
import FetchingSpinner from "../../../../partials/spinners/FetchingSpinner";
import TableLoading from "../../../../partials/TableLoading";
import { FaEdit, FaArchive, FaTrash, FaTrashRestore } from "react-icons/fa";
import { StoreContext } from "../../../../store/StoreContext";
import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "../../../../store/StoreAction";
import Status from "../../../../partials/Status";
import ModalArchive from "../../../../partials/modals/ModalArchive";
import ModalRestore from "../../../../partials/modals/ModalRestore";
import ModalDelete from "../../../../partials/modals/ModalDelete";

const NotificationList = ({ setItemEdit, itemEdit, search, filter }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const {
    isLoading,
    isFetching,
    data: dataNotification,
  } = useQueryData(
    `${apiVersion}/controllers/developers/settings/notification/notification.php`,
    "get",
    "notification"
  );

  const filteredData = dataNotification?.data?.filter((item) => {
    const q = search?.toLowerCase() ?? "";

    const matchesSearch =
      item.notification_name?.toLowerCase().includes(q) ||
      item.notification_email?.toLowerCase().includes(q) ||
      item.notification_phone?.toLowerCase().includes(q) ||
      item.notification_purpose?.toLowerCase().includes(q);

    const matchesFilter =
      filter === "all"
        ? true
        : filter === "active"
          ? item.notification_is_active == 1
          : item.notification_is_active == 0;

    return matchesSearch && matchesFilter;
  });

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
              <th>Phone</th>
              <th>Purpose</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="100%">
                  <TableLoading cols={7} count={10} />
                </td>
              </tr>
            ) : dataNotification?.count === 0 ? (
              <tr>
                <td colSpan="100%">
                  <NoData />
                </td>
              </tr>
            ) : (
              filteredData?.map((item, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>

                  <td>
                    <Status
                      text={
                        item.notification_is_active == 1
                          ? "active"
                          : "inactive"
                      }
                    />
                  </td>

                  <td>{item.notification_name}</td>
                  <td>{item.notification_email}</td>
                  <td>{item.notification_phone}</td>
                  <td>{item.notification_purpose}</td>

                  <td>
                    <div className="flex gap-3">

                      {item.notification_is_active == 1 ? (
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
          mysqlApiArchive={`${apiVersion}/controllers/developers/settings/notification/active.php?id=${itemEdit?.notification_aid}`}
          msg="Archive this notification?"
          successMsg="successfully archived."
          queryKey="notification"
          item={itemEdit?.notification_name}
        />
      )}

      {store.isRestore && (
        <ModalRestore
          mysqlApiRestore={`${apiVersion}/controllers/developers/settings/notification/active.php?id=${itemEdit?.notification_aid}`}
          msg="Restore this notification?"
          successMsg="successfully restored."
          queryKey="notification"
          item={itemEdit?.notification_name}
        />
      )}

      {store.isDelete && (
        <ModalDelete
          mysqlApiDelete={`${apiVersion}/controllers/developers/settings/notification/notification.php?id=${itemEdit?.notification_aid}`}
          msg="Delete this notification?"
          successMsg="successfully deleted."
          item={itemEdit?.notification_name}
          dataItem={itemEdit}
          queryKey="notification"
        />
      )}
    </>
  );
};

export default NotificationList;