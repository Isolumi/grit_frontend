import { useMemo } from "react";
import { useTable, Column } from "react-table";
import fakeData from "./MOCK_DATA.json";

const Content = () => {
  interface Data {
    col1: string;
    col2: string;
  }

  const data = useMemo<Data[]>(() => fakeData, []);
  const columns = useMemo<Column<Data>[]>(
    () => [
      {
        Header: "head1",
        accessor: "col1",
      },
      {
        Header: "head2",
        accessor: "col2",
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  return (
      <div className="min-w-[1500px] border-2">
        <table {...getTableProps()} className="border-2 w-100">
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
                    <td {...cell.getCellProps()} style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: i % 2 === 0 ? 'lightgray' : 'white'
                    }}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
  );
};

export default Content;
