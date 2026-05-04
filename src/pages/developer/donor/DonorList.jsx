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
import { FaUsers, FaEdit, FaArchive, FaTrash, FaTrashRestore } from "react-icons/fa";
import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "../../../store/StoreAction";
import ModalArchive from "../../../partials/modals/ModalArchive";
import ModalRestore from "../../../partials/modals/ModalRestore";
import ModalDelete from "../../../partials/modals/ModalDelete";

const DonorList = ({ itemEdit, setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const [page, setPage] = React.useState(1);
  const [filterData, setFilterData] = React.useState("");
  const [onSearch, setOnSearch] = React.useState(false);
  const search = React.useRef({ value: "" });

  const { ref, inView } = useInView();

  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["donors", search.current.value, store.isSearch, filterData],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        ``,
        `${apiVersion}/controllers/developers/donor/page.php?start=${pageParam}`,
        false,
        { filterData, searchValue: search?.current?.value },
        `post`
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

  const totalCount = result?.pages[0]?.total ?? 0;

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
      {/* TOP BAR (KEEP YOUR ORIGINAL) */}
      <div className="flex items-center gap-4 py-3">
        <div className="relative">
          <label className="absolute top-4 left-2 text-xs text-primary bg-white px-1">
            Status
          </label>
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

        {/* ✅ KEEP THIS PART */}
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <FaUsers />
          <span>{totalCount}</span>
        </div>

        <div className="ml-auto">
          <SearchBar
            search={search}
            dispatch={dispatch}
            store={store}
            result={result?.pages}
            isFetching={isFetching}
            setOnSearch={setOnSearch}
            onSearch={onSearch}
          />
        </div>
      </div>

      {/* TABLE (NOW MATCHES DESIGNATION STYLE) */}
      <div className="relative pt-4">
        {isFetching && status !== "pending" && <FetchingSpinner />}

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Name</th>
              <th>Email</th>
              <th>Stripe ID</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {status === "pending" ? (
              <tr>
                <td colSpan="100%">
                  <TableLoading cols={6} count={10} />
                </td>
              </tr>
            ) : result?.pages[0]?.count === 0 ? (
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
                          text={item.donor_is_active == 1 ? "active" : "inactive"}
                        />
                      </td>

                      <td>
                        {item.donor_first_name} {item.donor_last_name}
                      </td>

                      <td>{item.donor_email}</td>

                      <td>{item.donor_stripe || ""}</td>

                      <td>
                        <button className="bg-blue-400 rounded py-1 px-4 text-white">Donate</button>
                      </td>

                      <td>
                        <div className="flex gap-3">
                          {item.donor_is_active == 1 ? (
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

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
        <p>2026 All rights reserved.</p>
        <p>Powered by <a className="text-blue-400">Frontline Business Solutions, Inc.</a></p>
      </div>

      {/* MODALS */}
      {store.isArchive && (
        <ModalArchive
          mysqlApiArchive={`${apiVersion}/controllers/developers/donor/active.php?id=${itemEdit?.donor_aid}`}
          msg="Archive this donor?"
          successMsg="Successfully archived."
          item={`${itemEdit?.donor_first_name} ${itemEdit?.donor_last_name}`}
          queryKey="donors"
        />
      )}

      {store.isRestore && (
        <ModalRestore
          mysqlApiRestore={`${apiVersion}/controllers/developers/donor/active.php?id=${itemEdit?.donor_aid}`}
          msg="Restore this donor?"
          successMsg="Successfully restored."
          item={`${itemEdit?.donor_first_name} ${itemEdit?.donor_last_name}`}
          queryKey="donors"
        />
      )}

      {store.isDelete && (
        <ModalDelete
          mysqlApiDelete={`${apiVersion}/controllers/developers/donor/donor.php?id=${itemEdit?.donor_aid}`}
          msg="Delete this donor?"
          successMsg="Successfully deleted."
          item={`${itemEdit?.donor_first_name} ${itemEdit?.donor_last_name}`}
          dataItem={itemEdit}
          queryKey="donors"
        />
      )}
    </>
  );
};

export default DonorList;