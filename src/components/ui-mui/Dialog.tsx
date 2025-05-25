
import React from 'react';
import {
  Dialog as MuiDialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  DialogProps as MuiDialogProps,
  DialogTitleProps as MuiDialogTitleProps,
  DialogContentProps as MuiDialogContentProps,
  DialogActionsProps as MuiDialogActionsProps,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { cn } from '@/lib/utils';

export interface DialogProps extends MuiDialogProps {
  className?: string;
}

export interface DialogTitleProps extends MuiDialogTitleProps {
  className?: string;
  onClose?: () => void;
}

export interface DialogContentProps extends MuiDialogContentProps {
  className?: string;
}

export interface DialogActionsProps extends MuiDialogActionsProps {
  className?: string;
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <MuiDialog
        ref={ref}
        className={cn('', className)}
        {...props}
      >
        {children}
      </MuiDialog>
    );
  }
);

export const DialogTitle = React.forwardRef<HTMLDivElement, DialogTitleProps>(
  ({ className, children, onClose, ...props }, ref) => {
    return (
      <MuiDialogTitle
        ref={ref}
        className={cn('flex items-center justify-between', className)}
        {...props}
      >
        {children}
        {onClose && (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </MuiDialogTitle>
    );
  }
);

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <MuiDialogContent
        ref={ref}
        className={cn('', className)}
        {...props}
      >
        {children}
      </MuiDialogContent>
    );
  }
);

export const DialogActions = React.forwardRef<HTMLDivElement, DialogActionsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <MuiDialogActions
        ref={ref}
        className={cn('', className)}
        {...props}
      >
        {children}
      </MuiDialogActions>
    );
  }
);

Dialog.displayName = 'Dialog';
DialogTitle.displayName = 'DialogTitle';
DialogContent.displayName = 'DialogContent';
DialogActions.displayName = 'DialogActions';
