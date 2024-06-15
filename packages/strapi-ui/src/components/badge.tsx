import React from "@marufzak/react";
import type ReactTypes from "@marufzak/react/types";
import { cn } from "../utils";

const variants = {
  default: "text-neutral-600 font-bold bg-neutral-150 uppercase",
  active: "text-primary-600 font-bold bg-primary-200 uppercase",
};

const sizes = {
  sm: "text-xs px-0.5 rounded-sm",
  md: "text-xs p-1 rounded-[4px]",
};

interface Props extends ReactTypes.ComponentProps<"span"> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

function Badge({
  variant = "default",
  size = "sm",
  children,
  className,
  ...props
}: Props) {
  return (
    <span className={cn(variants["active"], sizes[size], className)} {...props}>
      {children}
    </span>
  );
}

export default Badge;
