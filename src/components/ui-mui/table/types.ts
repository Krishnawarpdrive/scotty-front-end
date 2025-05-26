
import {
  TableProps as MuiTableProps,
  TableHeadProps as MuiTableHeadProps,
  TableBodyProps as MuiTableBodyProps,
  TableRowProps as MuiTableRowProps,
  TableCellProps as MuiTableCellProps,
} from '@mui/material';

export interface TableProps extends MuiTableProps {
  className?: string;
}

export interface TableHeaderProps extends MuiTableHeadProps {
  className?: string;
}

export interface TableBodyProps extends MuiTableBodyProps {
  className?: string;
}

export interface TableRowProps extends MuiTableRowProps {
  className?: string;
}

export interface TableCellProps extends MuiTableCellProps {
  className?: string;
}

export interface TableHeadProps extends MuiTableCellProps {
  className?: string;
}
