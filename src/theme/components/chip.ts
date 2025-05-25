
import { Components, Theme } from '@mui/material/styles';

export const chipComponents: Components<Theme>['MuiChip'] = {
  styleOverrides: {
    root: {
      borderRadius: 4,
      fontSize: '0.75rem',
      height: 20,
    },
  },
};
