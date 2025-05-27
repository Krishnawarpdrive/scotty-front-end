
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useKeyboardShortcuts } from '@/contexts/KeyboardShortcutsContext';

interface KeyboardIconProps {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

export const KeyboardIcon: React.FC<KeyboardIconProps> = ({
  variant = 'ghost',
  size = 'sm',
  className
}) => {
  const { openModal } = useKeyboardShortcuts();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={variant}
            size={size}
            onClick={openModal}
            className={className}
            aria-label="View keyboard shortcuts"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
              <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M6 16h8" />
            </svg>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Keyboard shortcuts (?)</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
