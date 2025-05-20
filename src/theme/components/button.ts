
import { Components, Theme } from '@mui/material/styles';

export const buttonComponents: Components<Theme>['MuiButton'] = {
  styleOverrides: {
    root: {
      height: 36,
      borderRadius: 8,
      textTransform: 'none',
      fontWeight: 500,
    },
  },
};
