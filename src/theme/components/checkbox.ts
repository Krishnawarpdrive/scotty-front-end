
import { Components, Theme } from '@mui/material/styles';

export const checkboxComponents: Components<Theme>['MuiCheckbox'] = {
  styleOverrides: {
    root: {
      padding: 4,
      '&.Mui-checked': {
        color: '#009933',
      },
    },
  },
};
