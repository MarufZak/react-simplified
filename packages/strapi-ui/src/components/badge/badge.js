import React from "react-simplified/react";
import { cn } from "../../utils";

const variants = {
  default: "text-neutral-600 font-bold bg-neutral-150 uppercase",
  active: "text-primary-600 font-bold bg-primary-200 uppercase",
};

const sizes = {
  sm: "text-xs px-0.5 rounded-sm",
  md: "text-xs p-1 rounded-[4px]",
};

function Badge({ variant="default", size="sm", children }) {
  console.log(variant, size);
  return <span className={cn(variants[variant], sizes[size])}>{children}</span>;
}

export default Badge;
