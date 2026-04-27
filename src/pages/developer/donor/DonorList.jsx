import React from "react";
import { StoreContext } from "../../../store/StoreContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryDataInfinite } from "../../../functions/custom-hooks/queryDataInfinite";
import { apiVersion } from "../../../functions/functions-general";
import { useInView } from "react-intersection-observer";
import NoData from "../../../partials/NoData";
import ServerError from "../../../partials/ServerError";
import TableLoading from "../../../partials/TableLoading";
import FetchingSpinner from "../../../partials/spinners/FetchingSpinner";
import Loadmore from "../../../partials/Loadmore";
import Status from "../../../partials/Status";
import SearchBar from "../../../partials/SearchBar";
import { FaUsers } from "react-icons/fa";
import {
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
  let counter = 1;

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
        `post`,
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
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

  return (
    <>
      <div className="flex items-center gap-4 py-3">
        <div className="relative">
          <label className="absolute -top-2 left-2 text-xs text-primary bg-white px-1">
            Status
          </label>
          <select
            className="border border-gray-300 rounded px-2 pt-3 pb-1 text-sm"
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

      <div className="relative rounded-md">
        {status !== "pending" && isFetching && <FetchingSpinner />}
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-3 py-2">#</th>
              <th className="text-left px-3 py-2">Status</th>
              <th className="text-left px-3 py-2">Name</th>
              <th className="text-left px-3 py-2">Email</th>
              <th className="text-left px-3 py-2">Stripe ID</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {!error &&
              (status === "pending" || result?.pages[0]?.count === 0) && (
                <tr>
                  <td colSpan="100%" className="p-10">
                    {status === "pending" ? (
                      <TableLoading cols={5} count={10} />
                    ) : (
                      <NoData />
                    )}
                  </td>
                </tr>
              )}
            {error && (
              <tr>
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            )}
            {result?.pages?.map((page, key) => (
              <React.Fragment key={key}>
                {page?.data?.map((item, key) => (
                  <tr key={key} className="border-b border-gray-100">
                    <td className="px-3 py-2">{counter++}.</td>
                    <td className="px-3 py-2">
                      <Status
                        text={item.donor_is_active == 1 ? "active" : "inactive"}
                      />
                    </td>
                    <td className="px-3 py-2">
                      {item.donor_first_name} {item.donor_last_name}
                    </td>
                    <td className="px-3 py-2">{item.donor_email}</td>
                    <td className="px-3 py-2">{item.donor_stripe || "--"}</td>
                    <td className="px-3 py-2 text-right">
                      <button
                        type="button"
                        className="bg-primary text-white text-xs px-3 py-1 rounded"
                        onClick={() => {}}
                      >
                        Donate
                      </button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center flex-col items-center pb-10">
          <Loadmore
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            result={result?.pages[0]}
            setPage={setPage}
            page={page}
            refView={ref}
            isSearchOrFilter={store.isSearch || result?.isFilter}
          />
        </div>
      </div>

      {store.isArchive && (
        <ModalArchive
          mysqlApiArchive={`${apiVersion}/controllers/developers/donor/active.php?id=${itemEdit.donor_aid}`}
          msg="Are you sure you want to archive this record?"
          successMsg="Successfully archived."
          item={`${itemEdit.donor_first_name} ${itemEdit.donor_last_name}`}
          dataItem={itemEdit}
          queryKey="donors"
        />
      )}
      {store.isRestore && (
        <ModalRestore
          mysqlApiRestore={`${apiVersion}/controllers/developers/donor/active.php?id=${itemEdit.donor_aid}`}
          msg="Are you sure you want to restore this record?"
          successMsg="Successfully restored."
          item={`${itemEdit.donor_first_name} ${itemEdit.donor_last_name}`}
          dataItem={itemEdit}
          queryKey="donors"
        />
      )}
      {store.isDelete && (
        <ModalDelete
          mysqlApiDelete={`${apiVersion}/controllers/developers/donor/donor.php?id=${itemEdit.donor_aid}`}
          msg="Are you sure you want to delete this record?"
          successMsg="Successfully deleted."
          item={`${itemEdit.donor_first_name} ${itemEdit.donor_last_name}`}
          dataItem={itemEdit}
          queryKey="donors"
        />
      )}
    </>
  );
};

export default DonorList;
