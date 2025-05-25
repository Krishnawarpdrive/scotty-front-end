
import { Components, Theme } from '@mui/material/styles';

export const tableCellComponents: Components<Theme>['MuiTableCell'] = {
  styleOverrides: {
    root: {
      fontFamily: 'Rubik, sans-serif',
      fontSize: '12px',
      color: '#262626',
      padding: '8px 16px',
      borderBottom: '1px solid #e5e7eb',
    },
    head: {
      fontWeight: 500,
      fontSize: '12px',
      color: '#262626',
      textTransform: 'uppercase',
      letterSpacing: '0.025em',
      backgroundColor: '#f9fafb',
      height: '48px',
    },
  },
};

export const tableComponents: Components<Theme>['MuiTable'] = {
  styleOverrides: {
    root: {
      fontFamily: 'Rubik, sans-serif',
      fontSize: '12px',
    },
  },
};

export const tableHeadComponents: Components<Theme>['MuiTableHead'] = {
  styleOverrides: {
    root: {
      backgroundColor: '#f9fafb',
    },
  },
};

export const tableBodyComponents: Components<Theme>['MuiTableBody'] = {
  styleOverrides: {
    root: {
      '& .MuiTableRow-root:hover': {
        backgroundColor: '#f9fafb',
      },
      '& .MuiTableRow-root:last-child .MuiTableCell-root': {
        borderBottom: 'none',
      },
    },
  },
};

export const tableRowComponents: Components<Theme>['MuiTableRow'] = {
  styleOverrides: {
    root: {
      '&:hover': {
        backgroundColor: '#f9fafb',
      },
      '&[data-state=selected]': {
        backgroundColor: '#eff6ff',
      },
    },
  },
};
