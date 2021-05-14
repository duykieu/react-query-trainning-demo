import React from "react";
import { useTable, useSortBy } from "react-table";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #ffffff;
  border-radius: 4px;
  table {
    width: 100%;
    color: #1d2446;
    tr {
      &:hover {
        background-color: #f0f0f0;
      }
    }
  }
  th {
    font-size: 12px;
    font-weight: 600;
    padding: 15px 15px 10px 15px;
    background-color: #e7f0ff;
    color: #434e89;
  }
  td {
    padding: 15px 15px 10px 15px;
    font-size: 12px;
    font-weight: 400;
  }
  tr:not(:last-child) {
    border-bottom: 1px solid #5664af;
  }
`;

function OctoposTable({
  columns,
  data,
  manualSort = false,
  onSortChanged = () => {},
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { sortBy },
  } = useTable(
    {
      columns,
      data,
      manualSortBy: manualSort,
    },
    useSortBy
  );

  return (
    <Wrapper>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div
                    style={{
                      ...(column.style || {}),
                      width: column.columnWidth
                        ? `${column.columnWidth}px`
                        : undefined,
                    }}
                  >
                    {column.render("Header")}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </div>
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
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Wrapper>
  );
}

export default OctoposTable;
