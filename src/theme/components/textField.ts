
import { Components, Theme } from '@mui/material/styles';

export const textFieldComponents: Components<Theme>['MuiTextField'] = {
  styleOverrides: {
    root: {
      '& .MuiInputBase-root': {
        height: 32,
        borderRadius: 8,
      },
    },
  },
};
