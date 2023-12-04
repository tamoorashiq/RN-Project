import { Typography } from "@mui/material"
import React, { useMemo } from "react"
import { Link } from "react-router-dom"
import { useTable, useRowSelect } from "react-table"
import { Theme } from "../../Theme"

const Table = ({ columns, data, noCheck = true }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds }
  } = useTable(
    {
      columns,
      data
    },
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div
              style={{
                paddingLeft: 20
              }}
            >
              <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div
              style={{
                paddingLeft: 20
              }}
            >
              {!noCheck && (
                <input type="checkbox" {...row.getToggleRowSelectedProps()} />
              )}
            </div>
          )
        },
        ...columns
      ])
    }
  )

  const selectedRows = useMemo(() => {
    return selectedFlatRows.map(row => row.original)
  }, [selectedFlatRows])
  const rowStyle = {
    height: 70,
    borderRadius: 20,
    paddingBottom: 20,
    border: "solid 10px #fafafa",
    backgroundColor: "#fff"
  }
  return (
    <table
      {...getTableProps()}
      style={{ width: "100%", borderCollapse: "collapse" }}
    >
      <thead>
        {headerGroups.map(headerGroup => (
          <tr
            style={{ ...rowStyle, height: 50 }}
            {...headerGroup.getHeaderGroupProps()}
          >
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  color: "black",
                  fontWeight: "bold",
                  textAlign: "left"
                }}
              >
                <Typography>{column.render("Header")}</Typography>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)

          return (
            <tr {...row.getRowProps()} style={rowStyle}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      //   padding: "10px",
                      textAlign: "left"
                      //   borderRadius: 20
                      //   backgroundColor: "blue"
                      //   background: "papayawhip"
                    }}
                  >
                    {/* {console.log(cell)} */}
                    <Typography>{cell.render("Cell")}</Typography>
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
export default Table
