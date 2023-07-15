import { useEffect, useState } from "react";
import { useTable, ColumnInstance } from "react-table";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { getTableColumns } from "./column";

interface RefreshProps {
  refresh: boolean;
}

function ContentTable({ refresh }: RefreshProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<Data[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [acFilters, setAcFilters] = useState<AcFilters>({
    bcc: false,
    rcl: false,
    sch: false,
    sus: false,
    rsp: false,
    nac: false,
    ub: false,
    bl: false,
    can: false,
    mcn: false,
  });
  const [scFilters, setScFilters] = useState<ScFilters>({
    success: false,
    error: false,
  });
  const columns = getTableColumns(
    currentPage,
    acFilters,
    scFilters,
    setAcFilters,
    setScFilters,
    data
  );

  useEffect(() => {
    setAcFilters({
      bcc: false,
      rcl: false,
      sch: false,
      sus: false,
      rsp: false,
      nac: false,
      ub: false,
      bl: false,
      can: false,
      mcn: false,
    });
    setScFilters({
      success: false,
      error: false,
    });
    navigate("/");
  }, [refresh]);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, location, acFilters, scFilters]);

  async function fetchData(page: number) {
    const params = new URLSearchParams(location.search);
    const query = Number(params.get("query")) || 0;
    const acString = Object.entries(acFilters)
      .filter(([, value]) => value)
      .map(([key]) => `activityCode=${key.toUpperCase()}`)
      .join("&");
    const scString = Object.entries(scFilters)
      .filter(([, value]) => value)
      .map(([key]) => `statusCode=${key.toUpperCase()}`)
      .join("&");

    const filt = [acString, scString].filter((s) => s !== "").join("&");

    let url;

    try {
      if (query !== 0) {
        url = `http://localhost:8080/getTmfTransactions?page=${page}&query=${query}`;
      } else if (filt !== "") {
        url = `http://localhost:8080/getFilteredTmfTransactions?page=${page}&${filt}`;
      } else {
        url = `http://localhost:8080/getTmfTransactions?page=${page}`;
      }

      const response = await axios.get(url);
      setData(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (e) {
      console.error("Error: ", e);
    }
  }

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  const handlePageChange = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };
  const handleFirstPage = () => {
    setCurrentPage(0);
    handlePageChange({ selected: 0 });
  };

  return (
    <>
      <div className="min-h-[497px] border hide-scrollbar flex-grow overflow-x-auto">
        <table {...getTableProps()} style={{ width: "100%" }}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: ColumnInstance<Data>) => (
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
}

export default ContentTable;
