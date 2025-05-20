
import { Components, Theme } from '@mui/material/styles';

export const cardComponents: Components<Theme>['MuiCard'] = {
  styleOverrides: {
    root: {
      borderRadius: 8,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      padding: 16,
    },
  },
};
