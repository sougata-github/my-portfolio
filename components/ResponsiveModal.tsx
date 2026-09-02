"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useIsMobile } from "./hooks/use-mobile";

/*
  Dialog from md up, drawer below. The one place shadcn's Radix primitives
  still earn their keep on this site.

  description is read by assistive tech and hidden visually, Radix warns
  when a dialog has none. The titles restate size, weight and colour as
  utilities because shadcn's title primitives ship bold foreground text and
  the .label class, not being a utility, cannot win that merge. className reaches the dialog panel so a caller
  can widen it, which a code block needs and a plain message does not.
*/
interface Props {
  children: React.ReactNode;
  open: boolean;
  title: string;
  description?: string;
  className?: string;
  onOpenChange: (open: boolean) => void;
}

const ResponsiveModal = ({
  children,
  open,
  title,
  description,
  className,
  onOpenChange,
}: Props) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[88vh] px-4 pt-2 pb-6">
          <DrawerHeader className="px-0 text-left">
            <DrawerTitle className="label text-left text-[10px] font-normal text-muted-foreground md:text-[11px]">{title}</DrawerTitle>
            {description && (
              <DrawerDescription className="sr-only">
                {description}
              </DrawerDescription>
            )}
          </DrawerHeader>
          <div className="min-h-0 overflow-y-auto">{children}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn("rounded-none border-border bg-background", className)}
      >
        <DialogHeader>
          <DialogTitle className="label text-left text-[10px] font-normal text-muted-foreground md:text-[11px]">{title}</DialogTitle>
          {description && (
            <DialogDescription className="sr-only">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ResponsiveModal;
