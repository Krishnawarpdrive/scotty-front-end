
import { Theme } from '@mui/material/styles';

// Properly define typography options
export const typography = {
  fontFamily: 'Rubik',
  fontSize: 13,
  h1: {
    fontSize: '2rem',
    fontWeight: 500,
  },
  h2: {
    fontSize: '1.5rem',
    fontWeight: 500,
  },
  h3: {
    fontSize: '1.25rem',
    fontWeight: 500,
  },
  h4: {
    fontSize: '1.125rem',
    fontWeight: 500,
  },
  h5: {
    fontSize: '1rem',
    fontWeight: 500,
  },
  h6: {
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  body1: {
    fontSize: '0.8125rem', // 13px
  },
  body2: {
    fontSize: '0.75rem', // 12px
  },
  caption: {
    fontSize: '0.625rem', // 10px
    color: '#808080',
  },
};

// Export the type for better type safety
export type TypographyOptions = typeof typography;
