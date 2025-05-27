
import { PaletteOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      streak: string;
      achievement: string;
      progress: string;
      milestone: string;
    };
  }

  interface PaletteOptions {
    custom?: {
      streak?: string;
      achievement?: string;
      progress?: string;
      milestone?: string;
    };
  }
}

export const enhancedPalette: PaletteOptions = {
  primary: {
    main: '#009933',
    light: '#33AD5E',
    dark: '#007728',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#00724e',
    light: '#33906F',
    dark: '#005B3E',
    contrastText: '#ffffff',
  },
  success: {
    main: '#10B981',
    light: '#34D399',
    dark: '#059669',
  },
  warning: {
    main: '#F59E0B',
    light: '#FCD34D',
    dark: '#D97706',
  },
  error: {
    main: '#EF4444',
    light: '#F87171',
    dark: '#DC2626',
  },
  info: {
    main: '#3B82F6',
    light: '#60A5FA',
    dark: '#2563EB',
  },
  background: {
    default: '#f8fafc',
    paper: '#ffffff',
  },
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
  },
  custom: {
    streak: '#F59E0B',
    achievement: '#8B5CF6',
    progress: '#10B981',
    milestone: '#F97316',
  },
};
