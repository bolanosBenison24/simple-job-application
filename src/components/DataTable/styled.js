import styled from '@emotion/styled'
import { TableContainer, TableRow } from '@mui/material';

export const TableWrapper = styled(TableContainer)`
  border-radius: 10px;
`

export const StyledTableBodyRow = styled(TableRow)`
  cursor: pointer;

  &:nth-child(even) {
    background-color: #f7f7f7;
  }

  &:hover {
    background-color: #e8f2ff;
  }
`

export const StyledTableHeaderRow = styled(TableRow)`
  background-color: #74a2dd;

  th {
    color: white;
  }
`