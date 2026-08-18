import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap border text-sm font-medium transition-colors focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        ink: "border-primary bg-primary text-primary-foreground hover:bg-primary/88",
        clay: "border-accent bg-accent text-accent-foreground hover:bg-accent/88",
        outline: "border-foreground/40 bg-transparent text-foreground hover:bg-secondary",
        quiet: "border-transparent bg-secondary text-secondary-foreground hover:bg-muted",
        ghost: "border-transparent bg-transparent text-foreground hover:bg-secondary",
      },
      size: {
        md: "px-5 py-2.5",
        lg: "min-h-13 px-7 py-3 text-base",
        icon: "size-11 min-w-11 p-0",
      },
    },
    defaultVariants: { variant: "ink", size: "md" },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("eyebrow text-muted-foreground", className)}>{children}</p>;
}

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border border-foreground/25 px-2.5 py-1 text-xs font-medium tracking-wide",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Field({
  label,
  hint,
  id,
  children,
}: {
  label: string;
  hint?: string;
  id: string;
  children: (props: { id: string; "aria-describedby"?: string }) => React.ReactNode;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold">
        {label}
      </label>
      {hint ? (
        <p id={hintId} className="text-sm text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {children(hintId ? { id, "aria-describedby": hintId } : { id })}
    </div>
  );
}

export const inputClass =
  "min-h-11 w-full border border-input bg-parchment px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ring";
