import { useEffect, useState } from "react";
import { useTable, ColumnInstance } from "react-table";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { getTableColumns } from "./column";


function ContentTable() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    bcc: false,
    rcl: false,
  });

  const columns = getTableColumns(currentPage, filters, setFilters);

  useEffect(() => {
    console.log("filters: " + filters.bcc + " " + filters.rcl);
  }, [filters])

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, location]);

  async function fetchData(page: number) {
    const params = new URLSearchParams(location.search);
    const query = Number(params.get("query")) || 0;
    const activityCd = params.get("activityCode") || '';
    let url;

    try {
      if (query == 0 && activityCd == '') {
        url = `http://localhost:8080/getTmfTransactions?page=${page}`;
      } else if (query != 0){
        url = `http://localhost:8080/getTmfTransactions?page=${page}&query=${query}`;
      } else {
        url = `http://localhost:8080/getFilteredTmfTransactions?page=${page}&activityCode=${activityCd}`;
      }
      const response = await axios.get(url);
      setData(response.data.content);
      setTotalPages(response.data.totalPages);

    } catch (e) {
      console.error("Error:", e);
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

  const handleFilter = () => {
    navigate('/?activityCode=NAC')
  }

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckBoxChange = (event: any) => {
    setIsChecked(event.target.checked);
    console.log(isChecked)
  }

  return (
    <>
      <button onClick={handleFilter}>joe</button>
      <input type="checkbox" checked={isChecked} onChange={handleCheckBoxChange} />
      <div className="hide-scrollbar flex-grow overflow-x-auto">
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
