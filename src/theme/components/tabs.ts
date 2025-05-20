
import { Components, Theme } from '@mui/material/styles';

export const tabsComponents: Components<Theme>['MuiTabs'] = {
  styleOverrides: {
    root: {
      minHeight: 40,
    },
    indicator: {
      backgroundColor: '#009933',
    },
  },
};

export const tabComponents: Components<Theme>['MuiTab'] = {
  styleOverrides: {
    root: {
      textTransform: 'none',
      minHeight: 40,
      padding: '8px 16px',
      fontWeight: 500,
      '&.Mui-selected': {
        color: '#009933',
      },
    },
  },
};
