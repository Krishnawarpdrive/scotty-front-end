
import { Components, Theme } from '@mui/material/styles';

export const accordionComponents: Components<Theme>['MuiAccordion'] = {
  styleOverrides: {
    root: {
      borderRadius: 8,
      '&:before': {
        display: 'none',
      },
      '&.Mui-expanded': {
        margin: 0,
      },
    },
  },
};

export const accordionSummaryComponents: Components<Theme>['MuiAccordionSummary'] = {
  styleOverrides: {
    root: {
      minHeight: 48,
      '&.Mui-expanded': {
        minHeight: 48,
      },
    },
    content: {
      '&.Mui-expanded': {
        margin: '12px 0',
      },
    },
  },
};
