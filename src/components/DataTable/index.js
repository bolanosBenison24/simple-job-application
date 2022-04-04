import React from 'react'
import { compose, map, toPairs } from 'ramda'
import {
  Table,
  TableHead,
  TableBody,
  TableCell
} from '@mui/material'

import { TableWrapper, StyledTableBodyRow, StyledTableHeaderRow } from './styled'

const renderColumnCell = map(
  ({field, headerName}) => <TableCell key={field}>{headerName}</TableCell>
)
const TableHeader = ({ columns }) => {
  return (
    <TableHead>
      <StyledTableHeaderRow>
        { renderColumnCell(columns) }
      </StyledTableHeaderRow>
    </TableHead>
  )
}

const renderTableRow = ({ rows, onSelectRow }) => map(
  (data) => (
    <StyledTableBodyRow key={data.id} onClick={() => onSelectRow(data.id)}>
      {
        compose(
          map(([key, value]) => <TableCell key={key}>{value}</TableCell>),
          toPairs
        )(data)
      }
    </StyledTableBodyRow>
  )
)(rows)

const TableContent = ({ rows, onSelectRow }) => {
  return <TableBody> {renderTableRow({ rows, onSelectRow })} </TableBody>
}

const DataTables = ({ rows, columns, onSelectRow }) => {
  return (
    <TableWrapper>
      <Table>
        <TableHeader columns={columns} />
        <TableContent rows={rows} onSelectRow={onSelectRow} />
      </Table>
    </TableWrapper>
  )
}

export default DataTables
