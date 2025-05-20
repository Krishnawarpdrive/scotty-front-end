
import { createTheme } from '@mui/material/styles';
import { palette } from './palette';
import { typography } from './typography';
import { shadows } from './shadows';
import { shape } from './shape';
import { components } from './components';

// Create a theme instance with modular configuration
const muiTheme = createTheme({
  palette,
  typography,
  shadows,
  shape,
  components,
});

export default muiTheme;
