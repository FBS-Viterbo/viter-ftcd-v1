import React from "react";
import { StoreContext } from "../../../store/StoreContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryDataInfinite } from "../../../functions/custom-hooks/queryDataInfinite";
import { apiVersion } from "../../../functions/functions-general";
import { useInView } from "react-intersection-observer";

import NoData from "../../../partials/NoData";
import TableLoading from "../../../partials/TableLoading";
import FetchingSpinner from "../../../partials/spinners/FetchingSpinner";
import Status from "../../../partials/Status";
import SearchBar from "../../../partials/SearchBar";

import {
  FaUsers,
  FaEdit,
  FaArchive,
  FaTrash,
  FaTrashRestore,
} from "react-icons/fa";

import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "../../../store/StoreAction";

import ModalArchive from "../../../partials/modals/ModalArchive";
import ModalRestore from "../../../partials/modals/ModalRestore";
import ModalDelete from "../../../partials/modals/ModalDelete";

/* ✅ AGE FUNCTION */
const getAge = (birthday) => {
  if (!birthday) return "--";
  const birth = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

/* ✅ MONEY FORMAT */
const formatMoney = (value) => {
  return `$${Number(value || 0).toFixed(2)}`;
};

const ChildrenList = ({ itemEdit, setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const [page, setPage] = React.useState(1);
  const [filterData, setFilterData] = React.useState("");
  const search = React.useRef({ value: "" });

  const { ref, inView } = useInView();

  const {
    data: result,
    error,
    fetchNextPage,
    status,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["children", search.current.value, store.isSearch, filterData],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        ``,
        `${apiVersion}/controllers/developers/children/page.php?start=${pageParam}`,
        false,
        {
          filterData,
          searchValue: search?.current?.value,
        },
        "post"
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
    },
    refetchOnWindowFocus: false,
  });

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  const totalCount = result?.pages?.[0]?.total ?? 0;

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

  let counter = 1;

  return (
    <>
      {/* TOP BAR */}
      <div className="flex items-center gap-4 py-3">
        <div>
          <select
            className="border border-gray-300 rounded px-2 text-sm"
            onChange={(e) => setFilterData(e.target.value)}
            value={filterData}
          >
            <option value="">All</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-600">
          <FaUsers />
          <span>{totalCount}</span>
        </div>

        <div className="ml-auto">
          <SearchBar search={search} dispatch={dispatch} store={store} />
        </div>
      </div>

      {/* TABLE */}
      <div className="relative pt-4">
        {isFetching && status !== "pending" && <FetchingSpinner />}

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Name</th>
              <th>Birth Date</th>
              <th>Age</th>
              <th>Residency Status</th>
              <th>Donation Limit</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {status === "pending" ? (
              <tr>
                <td colSpan="100%">
                  <TableLoading cols={7} count={10} />
                </td>
              </tr>
            ) : result?.pages?.[0]?.count === 0 ? (
              <tr>
                <td colSpan="100%">
                  <NoData />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="100%">Something went wrong.</td>
              </tr>
            ) : (
              result?.pages?.map((page, i) => (
                <React.Fragment key={i}>
                  {page?.data?.map((item, key) => (
                    <tr key={key}>
                      <td>{counter++}</td>

                      <td>
                        <Status
                          text={
                            item.children_is_active == 1
                              ? "active"
                              : "inactive"
                          }
                        />
                      </td>

                      <td>{item.children_full_name}</td>

                      <td>{item.children_birthday}</td>

                      {/* ✅ AGE */}
                      <td>{getAge(item.children_birthday)}</td>

                      {/* ✅ RESIDENCY STATUS */}
                      <td>
                        {item.children_is_residence == 1
                          ? "Resident"
                          : "Non-Resident"}
                      </td>

                      {/* ✅ DONATION FORMAT */}
                      <td>{formatMoney(item.children_donation_amount_limit)}</td>

                      <td>
                        <div className="flex gap-3">
                          {item.children_is_active == 1 ? (
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
                  ))}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODALS (unchanged) */}
      {store.isArchive && (
        <ModalArchive
          mysqlApiArchive={`${apiVersion}/controllers/developers/children/active.php?id=${itemEdit?.children_aid}`}
          msg="Archive this record?"
          successMsg="Successfully archived."
          item={itemEdit?.children_full_name}
          queryKey="children"
        />
      )}

      {store.isRestore && (
        <ModalRestore
          mysqlApiRestore={`${apiVersion}/controllers/developers/children/active.php?id=${itemEdit?.children_aid}`}
          msg="Restore this record?"
          successMsg="Successfully restored."
          item={itemEdit?.children_full_name}
          queryKey="children"
        />
      )}

      {store.isDelete && (
        <ModalDelete
          mysqlApiDelete={`${apiVersion}/controllers/developers/children/children.php?id=${itemEdit?.children_aid}`}
          msg="Delete this record?"
          successMsg="Successfully deleted."
          item={itemEdit?.children_full_name}
          dataItem={itemEdit}
          queryKey="children"
        />
      )}
    </>
  );
};

export default ChildrenList;