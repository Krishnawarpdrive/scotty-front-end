
import React from 'react';
import {
  Drawer as MuiDrawer,
  DrawerProps as MuiDrawerProps,
  Box,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { cn } from '@/lib/utils';

export interface DrawerProps extends MuiDrawerProps {
  className?: string;
  side?: 'left' | 'right' | 'top' | 'bottom';
}

export interface DrawerContentProps {
  className?: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  ({ className, side = 'right', children, ...props }, ref) => {
    const anchor = side === 'left' ? 'left' : side === 'right' ? 'right' : side === 'top' ? 'top' : 'bottom';

    return (
      <MuiDrawer
        ref={ref as any}
        anchor={anchor}
        className={cn('', className)}
        {...props}
      >
        {children}
      </MuiDrawer>
    );
  }
);

export const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className, children, onClose, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={cn('p-0 overflow-y-auto', className)}
        sx={{ width: { xs: '100vw', sm: 400 }, maxWidth: '100vw' }}
        role="presentation"
        {...props}
      >
        {onClose && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        {children}
      </Box>
    );
  }
);

Drawer.displayName = 'Drawer';
DrawerContent.displayName = 'DrawerContent';
