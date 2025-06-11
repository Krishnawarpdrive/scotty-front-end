
import React, { ReactNode } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter
} from '@/components/ui/sheet';

export interface SideDrawerProps {
  title?: string;
  subtitle?: string;
  description?: string; // Added description property
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  size?: 'sm' | 'default' | 'lg' | 'xl' | 'full';
  footer?: ReactNode; // Added footer property
}

export const SideDrawer = ({
  title,
  subtitle,
  description,
  open,
  onOpenChange,
  children,
  size = 'default',
  footer
}: SideDrawerProps) => {
  const sizeClasses = {
    sm: 'sm:max-w-sm',
    default: 'sm:max-w-md md:max-w-lg',
    lg: 'sm:max-w-xl md:max-w-2xl',
    xl: 'sm:max-w-2xl md:max-w-3xl',
    full: 'sm:max-w-full'
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className={`p-0 ${sizeClasses[size]}`} side="right">
        <div className="flex flex-col h-full">
          {(title || subtitle || description) && (
            <SheetHeader className="py-4 px-6 border-b sticky top-0 bg-background z-10">
              {title && <SheetTitle>{title}</SheetTitle>}
              {description && <SheetDescription>{description}</SheetDescription>}
              {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </SheetHeader>
          )}
          
          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-4rem)]">
            {children}
          </div>
          
          {footer && (
            <SheetFooter className="border-t p-4 bg-background sticky bottom-0">
              {footer}
            </SheetFooter>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideDrawer;
