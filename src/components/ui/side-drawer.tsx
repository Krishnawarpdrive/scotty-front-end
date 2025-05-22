
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const sideDrawerVariants = cva(
  "w-[60vw] max-w-[60vw] overflow-y-auto",
  {
    variants: {
      size: {
        sm: "w-[40vw] max-w-[40vw]",
        default: "w-[60vw] max-w-[60vw]",
        lg: "w-[80vw] max-w-[80vw]",
        full: "w-[95vw] max-w-[95vw]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

interface SideDrawerProps extends React.ComponentPropsWithoutRef<typeof Sheet> {
  title?: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  size?: "sm" | "default" | "lg" | "full"
  className?: string
  contentClassName?: string
  closeButton?: boolean
}

export function SideDrawer({
  title,
  description,
  children,
  footer,
  size = "default",
  className,
  contentClassName,
  closeButton = true,
  ...props
}: SideDrawerProps) {
  return (
    <Sheet {...props}>
      <SheetContent 
        side="right" 
        className={cn(sideDrawerVariants({ size }), contentClassName)}
      >
        {closeButton && (
          <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </SheetClose>
        )}
        
        {(title || description) && (
          <SheetHeader className="mb-5">
            {title && <SheetTitle>{title}</SheetTitle>}
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
        )}
        
        <div className={cn("flex flex-col flex-1", className)}>
          {children}
        </div>
        
        {footer && (
          <SheetFooter className="mt-auto pt-4 border-t">
            {footer}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}

export { SheetTrigger } from "@/components/ui/sheet"
