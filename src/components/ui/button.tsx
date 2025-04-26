import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius)] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/10 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:opacity-90 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:opacity-90",
        outline:
          "border border-border/10 bg-background shadow-sm hover:bg-secondary hover:text-primary dark:border-slate-700 dark:bg-transparent dark:hover:bg-slate-800",
        secondary:
          "bg-secondary text-foreground/80 shadow-sm hover:text-primary dark:bg-slate-700 dark:text-slate-100",
        ghost: "hover:bg-secondary hover:text-primary text-foreground/80 dark:hover:bg-slate-800/50 dark:text-slate-300 dark:hover:text-white",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/90 dark:text-slate-300",
      },
      size: {
        default: "h-10 px-6 py-2.5",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants }; 