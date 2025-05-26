
import { Components, Theme } from '@mui/material/styles';

export const tableCellComponents: Components<Theme>['MuiTableCell'] = {
  styleOverrides: {
    root: {
      fontFamily: 'Rubik, sans-serif',
      fontSize: '12px',
      color: '#262626',
      padding: '12px 16px',
      borderBottom: '1px solid #e5e7eb',
      height: '60px',
    },
    head: {
      fontWeight: 500,
      fontSize: '12px',
      color: '#262626',
      textTransform: 'uppercase',
      letterSpacing: '0.025em',
      backgroundColor: '#f9fafb',
      height: '48px',
      fontFamily: 'Rubik, sans-serif',
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
      '& .MuiTableCell-root': {
        backgroundColor: '#f9fafb',
        fontFamily: 'Rubik, sans-serif',
      },
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
      '& .MuiTableRow-root': {
        height: '60px',
      },
      '& .MuiTableCell-root': {
        fontFamily: 'Rubik, sans-serif',
        height: '60px',
      },
    },
  },
};

export const tableRowComponents: Components<Theme>['MuiTableRow'] = {
  styleOverrides: {
    root: {
      height: '60px',
      '&:hover': {
        backgroundColor: '#f9fafb',
      },
      '&[data-state=selected]': {
        backgroundColor: '#eff6ff',
      },
    },
  },
};
