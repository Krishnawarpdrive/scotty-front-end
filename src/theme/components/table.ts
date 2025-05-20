
import { Components, Theme } from '@mui/material/styles';

export const tableCellComponents: Components<Theme>['MuiTableCell'] = {
  styleOverrides: {
    root: {
      padding: '8px 16px',
      fontSize: 13,
    },
    head: {
      fontWeight: 500,
    },
  },
};
