import React from "react-simplified/core";
import type ReactTypes from "react-simplified/types";
import { cn } from "../utils";

const variants = {
  primary: "font-bold text-neutral-0 bg-primary-600 hover:bg-primary-500",
};

const sizes = {
  sm: "rounded-[4px] px-4 py-2 text-xs",
  md: "rounded-[4px] px-4 py-2.5 text-sm",
  lg: "rounded-[4px] px-4 py-3 text-sm",
};

interface Props extends ReactTypes.ComponentProps<"button"> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

const Button = ({
  size = "sm",
  variant = "primary",
  children,
  className,
  ...props
}: Props) => {
  return (
    <button
      className={cn(variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
