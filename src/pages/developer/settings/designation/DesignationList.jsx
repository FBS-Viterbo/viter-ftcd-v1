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

const DesignationList = ({ setItemEdit, itemEdit, search, filter }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const {
    isLoading,
    isFetching,
    data: dataDesignation,
  } = useQueryData(
    `${apiVersion}/controllers/developers/settings/designation/designation.php`,
    "get",
    "designation"
  );

  const filteredData = dataDesignation?.data?.filter((item) => {
    const q = search?.toLowerCase() ?? "";

    const matchesSearch =
      item.designation_name?.toLowerCase().includes(q) ||
      item.designation_category?.toLowerCase().includes(q);

    const matchesFilter =
      filter === "all"
        ? true
        : filter === "active"
          ? item.designation_is_active == 1
          : item.designation_is_active == 0;

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
              <th>Category</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="100%">
                  <TableLoading cols={5} count={10} />
                </td>
              </tr>
            ) : dataDesignation?.count === 0 ? (
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
                    <Status text={item.designation_is_active == 1 ? "active" : "inactive"} />
                  </td>

                  <td>{item.designation_name}</td>
                  <td>{item.designation_category}</td>

                  <td>
                    <div className="flex gap-3">

                      {item.designation_is_active == 1 ? (
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
          mysqlApiArchive={`${apiVersion}/controllers/developers/settings/designation/active.php?id=${itemEdit?.designation_aid}`}
          msg="Archive this designation?"
          successMsg="successfully archived."
          queryKey="designation"
          item={itemEdit?.designation_name}
        />
      )}

      {store.isRestore && (
        <ModalRestore
          mysqlApiRestore={`${apiVersion}/controllers/developers/settings/designation/active.php?id=${itemEdit?.designation_aid}`}
          msg="Restore this designation?"
          successMsg="successfully restored."
          queryKey="designation"
          item={itemEdit?.designation_name}
        />
      )}

      {store.isDelete && (
        <ModalDelete
          mysqlApiDelete={`${apiVersion}/controllers/developers/settings/designation/designation.php?id=${itemEdit?.designation_aid}`}
          msg="Delete this designation?"
          successMsg="successfully deleted."
          item={itemEdit?.designation_name}
          dataItem={itemEdit}
          queryKey="designation"
        />
      )}
    </>
  );
};

export default DesignationList;