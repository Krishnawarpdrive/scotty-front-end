
import { Components, Theme } from '@mui/material/styles';

export const drawerComponents: Components<Theme>['MuiDrawer'] = {
  styleOverrides: {
    paper: {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
  },
};
