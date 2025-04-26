'use client';

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface MobileModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function MobileModal({ isOpen, onClose, children }: MobileModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(
        "fixed bottom-0 left-0 right-0 w-full p-0 rounded-t-2xl",
        "md:relative md:max-w-3xl md:rounded-lg md:p-6",
        "transform transition-all duration-300 ease-in-out",
        "border-t-2 border-border/40 md:border-t-0",
        "bg-background shadow-lg"
      )}>
        <div className="w-full h-full overflow-y-auto max-h-[80vh] md:max-h-none">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
} 