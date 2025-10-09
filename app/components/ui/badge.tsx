import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border py-1 px-3.5 rounded-mx text-sm font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        active:
          "border-transparent bg-[#00A57C] text-white [a&]:hover:bg-[#00A57C]/90",
        lightGreen:
          "border-transparent bg-[#06C755] text-white [a&]:hover:bg-[#06C755]/90",
        warning:
          "border-transparent bg-[#FFBE3D] text-secondary-foreground [a&]:hover:bg-[#FFBE3D]/90",
        risk: "border-transparent bg-[#ED4949] text-secondary-foreground [a&]:hover:bg-[#ED4949]/90",
        orange:
          "border-transparent bg-orange text-secondary-foreground [a&]:hover:bg-orange/90",
        white:
          "border-transparent bg-[#D9D9D9] text-secondary-foreground [a&]:hover:bg-[#D9D9D9]/90",
        normal:
          "border-transparent bg-[#1F78FF] text-secondary-foreground [a&]:hover:bg-[#1F78FF]/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
