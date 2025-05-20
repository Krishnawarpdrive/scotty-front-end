
import { Components, Theme } from '@mui/material/styles';

export const outlinedInputComponents: Components<Theme>['MuiOutlinedInput'] = {
  styleOverrides: {
    root: {
      borderRadius: 8,
      height: 32,
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#009933',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#009933',
        borderWidth: 1,
      },
    },
    input: {
      padding: '8px 12px',
    },
  },
};
