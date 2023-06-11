import { useMemo, useEffect, useState } from "react";
import { useTable, Column } from "react-table";
import axios from "axios";
import ReactPaginate from "react-paginate";

const ContentTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/getTmfTransactions?page=${page}&`
      );
      console.log(response.data);
      setData(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (e) {
      console.error("Error:", e);
    }
  };

  interface Data {
    id: String;
    createTs: Date;
    serviceType: String;
    requestType: String;
    txnSeqNo: Number;
    txnEffectiveTs: Date;
    billingAccountNum: Number;
    externalId: Number;
    subscriberNum: String;
    activityCd: String;
    overrideActivityCd: String;
    totalOffer: Number;
    hasSharedOffer: String;
    distributionId: Number;
    createdBy: String;
    statusCd: String;
    statusMessage: String;
    retryTimes: Number;
    reasonCd: String;
    processBy: String;
    processDuration: Number;
    lastUpdateTs: Date;
  }

  const columns = useMemo<Column<Data>[]>(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "CreateTs",
        accessor: "createTs",
      },
      {
        Header: "Service Type",
        accessor: "serviceType",
      },
      {
        Header: "Request Type",
        accessor: "requestType",
      },
      {
        Header: "TxnSeqNo",
        accessor: "txnSeqNo",
      },
      {
        Header: "TxnEffectiveTs",
        accessor: "txnEffectiveTs",
      },
      {
        Header: "Billing Account Num",
        accessor: "billingAccountNum",
      },
      {
        Header: "External ID",
        accessor: "externalId",
      },
      {
        Header: "Subscriber Num",
        accessor: "subscriberNum",
      },
      {
        Header: "ActivityCd",
        accessor: "activityCd",
      },
      {
        Header: "OverrideActivityCd",
        accessor: "overrideActivityCd",
      },
      {
        Header: "Total Offer",
        accessor: "totalOffer",
      },
      {
        Header: "Has Shared Offer",
        accessor: "hasSharedOffer",
      },
      {
        Header: "Distribution ID",
        accessor: "distributionId",
      },
      {
        Header: "Created By",
        accessor: "createdBy",
      },
      {
        Header: "Status Cd",
        accessor: "statusCd",
      },
      {
        Header: "Status Message",
        accessor: "statusMessage",
      },
      {
        Header: "Retry Times",
        accessor: "retryTimes",
      },
      {
        Header: "ReasonCd",
        accessor: "reasonCd",
      },
      {
        Header: "Process By",
        accessor: "processBy",
      },
      {
        Header: "Process Duration",
        accessor: "processDuration",
      },
      {
        Header: "Last Update Ts",
        accessor: "lastUpdateTs",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handlePageChange = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  return (
    <>
      <div className="h-[1000px] overflow-auto">
        <table {...getTableProps()} style={{ width: "100%" }} className="table-auto w-full">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: i % 2 === 0 ? "lightgray" : "white",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={totalPages}
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        onPageChange={handlePageChange}
        containerClassName={"flex flex-wrap justify-center space-x-2"}
        pageClassName={
          "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        }
        previousClassName={
          "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        }
        nextClassName={
          "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        }
        activeClassName={
          "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
        }
      />
    </>
  );
};

export default ContentTable;
