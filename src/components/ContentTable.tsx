import { useMemo, useEffect, useState } from "react";
import { useTable, Column } from "react-table";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useLocation } from "react-router-dom";

const ContentTable = () => {
  const location = useLocation();

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const query = Number(new URLSearchParams(location.search).get('query'));


  
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, location]);

  const fetchData = async (page: number) => {

    let url;
    try {
      if (query == 0) {
        url = `http://localhost:8080/getTmfTransactions?page=${page}`;
      } else {
        url = `http://localhost:8080/getTmfTransactions?page=${page}&query=${query}`;
      }
      console.log(url);
      const response = await axios.get(
        url
      );
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

  interface CellInfo {
    row: {
      index: number;
    };
  }

  const columns = useMemo<Column<Data>[]>(
    () => [
      {
        Header: "Row",
        Cell: ({ row: { index } }: CellInfo) => (
          <div>{10 * currentPage + index + 1}</div>
        ),
      },
      {
        Header: "ID",
        accessor: "id",
        width: 350,
        minWidth: 350,
        maxWidth: 350,
      },
      {
        Header: "CreateTs",
        accessor: "createTs",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "Service Type",
        accessor: "serviceType",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "Request Type",
        accessor: "requestType",
        width: 150,
        minWidth: 150,
        maxWidth: 150,
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
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "External ID",
        accessor: "externalId",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "Subscriber Num",
        accessor: "subscriberNum",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "ActivityCd",
        accessor: "activityCd",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "OverrideActivityCd",
        accessor: "overrideActivityCd",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "Total Offer",
        accessor: "totalOffer",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "Has Shared Offer",
        accessor: "hasSharedOffer",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "Distribution ID",
        accessor: "distributionId",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "Created By",
        accessor: "createdBy",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "Status Cd",
        accessor: "statusCd",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "Status Message",
        accessor: "statusMessage",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "Retry Times",
        accessor: "retryTimes",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "ReasonCd",
        accessor: "reasonCd",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "Process By",
        accessor: "processBy",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "Process Duration",
        accessor: "processDuration",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        Header: "Last Update Ts",
        accessor: "lastUpdateTs",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
    ],
    [currentPage]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handlePageChange = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const handleFirstPage = () => {
    setCurrentPage(0); // set current page in state
    handlePageChange({ selected: 0 }); // handle page change
  };

  return (
    <>
      <div className="hide-scrollbar flex-grow overflow-x-auto">
        <table {...getTableProps()} style={{ width: "100%" }}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="text-center align-middle"
                  >
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
                <tr {...row.getRowProps()} className="text-center align-middle">
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: i % 2 === 0 ? "lightgray" : "white",
                        position: "relative",
                        height: "100%",
                        overflow: "hidden", // This will hide the overflowing content
                        textOverflow: "ellipsis", // This will add '...' if the content overflows
                        whiteSpace: "nowrap", // This will prevent text from breaking into a new line
                        minWidth: cell.column.minWidth,
                        width: cell.column.width,
                      }}
                    >
                      <div className="2">{cell.render("Cell")}</div>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-start justify-end">
        <button
          onClick={handleFirstPage}
          disabled={currentPage === 0}
          className={`items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${
            currentPage === 0 ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          first
        </button>
        <ReactPaginate
          forcePage={currentPage}
          previousLabel={"previous"}
          nextLabel={"next"}
          pageCount={totalPages}
          marginPagesDisplayed={0}
          pageRangeDisplayed={0}
          onPageChange={handlePageChange}
          className="flex p-0"
          activeClassName="items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white"
          previousClassName="items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white"
          nextClassName="items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white"
        />
      </div>
    </>
  );
};

export default ContentTable;
