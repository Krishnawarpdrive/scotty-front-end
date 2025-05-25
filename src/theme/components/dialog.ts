
import { Components, Theme } from '@mui/material/styles';

export const dialogComponents: Components<Theme>['MuiDialog'] = {
  styleOverrides: {
    paper: {
      borderRadius: 8,
      minWidth: 400,
    },
  },
};
