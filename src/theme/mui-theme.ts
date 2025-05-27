
import { createTheme, Theme } from '@mui/material/styles';
import { enhancedPalette } from './enhanced-palette';
import { typography } from './typography';
import { shadows } from './shadows';
import { shape } from './shape';
import { components } from './components';

// Create a theme instance with enhanced configuration
const muiTheme = createTheme({
  palette: enhancedPalette,
  typography,
  shadows,
  shape,
  components,
});

export default muiTheme;
