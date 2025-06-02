
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { StageAction } from '../types/CandidateStageTypes';
import * as Icons from 'lucide-react';

interface StageActionButtonProps {
  action: StageAction;
  onExecute: () => void;
}

export const StageActionButton: React.FC<StageActionButtonProps> = ({
  action,
  onExecute
}) => {
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = async () => {
    setIsExecuting(true);
    try {
      await onExecute();
    } finally {
      setIsExecuting(false);
    }
  };

  const getButtonVariant = () => {
    switch (action.type) {
      case 'primary': return 'default';
      case 'secondary': return 'outline';
      case 'danger': return 'destructive';
      default: return 'outline';
    }
  };

  const getIcon = () => {
    const IconComponent = Icons[action.icon as keyof typeof Icons] as React.ComponentType<any>;
    return IconComponent ? <IconComponent className="h-4 w-4 mr-2" /> : null;
  };

  const buttonContent = (
    <Button
      variant={getButtonVariant()}
      size="sm"
      disabled={action.disabled || isExecuting}
      title={action.disabled ? action.disabledReason : action.label}
    >
      {getIcon()}
      {isExecuting ? 'Processing...' : action.label}
    </Button>
  );

  if (action.requiresConfirmation) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {buttonContent}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Action</AlertDialogTitle>
            <AlertDialogDescription>
              {action.confirmationMessage || `Are you sure you want to ${action.label.toLowerCase()}?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleExecute}>
              {action.label}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <div onClick={handleExecute}>
      {buttonContent}
    </div>
  );
};
