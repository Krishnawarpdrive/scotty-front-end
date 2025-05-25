
import { Components, Theme } from '@mui/material/styles';
import { buttonComponents } from './button';
import { cardComponents } from './card';
import { textFieldComponents } from './textField';
import { outlinedInputComponents } from './outlinedInput';
import { tabsComponents, tabComponents } from './tabs';
import { accordionComponents, accordionSummaryComponents } from './accordion';
import { tableCellComponents } from './table';
import { drawerComponents } from './drawer';
import { dialogComponents } from './dialog';

export const components: Components<Theme> = {
  MuiButton: buttonComponents,
  MuiCard: cardComponents,
  MuiTextField: textFieldComponents,
  MuiOutlinedInput: outlinedInputComponents,
  MuiTabs: tabsComponents,
  MuiTab: tabComponents,
  MuiAccordion: accordionComponents,
  MuiAccordionSummary: accordionSummaryComponents,
  MuiTableCell: tableCellComponents,
  MuiDrawer: drawerComponents,
  MuiDialog: dialogComponents,
};
