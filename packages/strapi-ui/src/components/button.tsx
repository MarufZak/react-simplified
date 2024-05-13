import React from "react-simplified/core";
import type ReactTypes from "react-simplified/types";
import { cn } from "../utils";

const themes = {
  default: {
    primary:
      "font-bold text-neutral-0 bg-primary-600 outline-none hover:bg-primary-500 focus-visible:ring-2 ring-offset-2 ring-primary-600 disabled:bg-neutral-150 disabled:text-neutral-600 disabled:border disabled:border-neutral-200",
    secondary:
      "font-bold text-primary-600 bg-primary-100 outline-none hover:bg-neutral-0 focus-visible:ring-2 ring-offset-2 ring-primary-600 border border-primary-200 focus:border-transparent disabled:bg-neutral-150 disabled:text-neutral-600 disabled:border-neutral-200",
    tertiary:
      "font-bold text-primary-800 bg-neutral-0 outline-none hover:bg-neutral-100 focus-visible:ring-2 ring-primary-600 border border-primary-200 disabled:bg-neutral-150 disabled:text-neutral-600 disabled:border-neutral-200",
  },
  success: {
    primary:
      "font-bold text-neutral-0 bg-success-600 outline-none hover:bg-success-500 focus-visible:ring-2 ring-offset-2 ring-primary-600 disabled:bg-neutral-150 disabled:text-neutral-600 disabled:border disabled:border-neutral-200",
    secondary:
      "font-bold text-success-600 bg-success-100 outline-none border border-success-200 focus-visible:border-transparent hover:bg-neutral-0 focus-visible:ring-2 ring-offset-2 ring-primary-600 disabled:bg-neutral-150 disabled:text-neutral-600 disabled:border disabled:border-neutral-200",
  },
  danger: {
    primary:
      "font-bold text-neutral-0 bg-danger-600 outline-none hover:bg-danger-500 focus-visible:ring-2 ring-offset-2 ring-primary-600 disabled:bg-neutral-150 disabled:text-neutral-600 disabled:border disabled:border-neutral-200",
    secondary:
      "font-bold text-danger-600 bg-danger-100 outline-none border border-danger-200 focus-visible:border-transparent hover:bg-neutral-0 focus-visible:ring-2 ring-offset-2 ring-primary-600 disabled:bg-neutral-150 disabled:text-neutral-600 disabled:border disabled:border-neutral-200",
  },
  text: {
    primary:
      "text-primary-600 hover:text-primary-500 outline-none focus-visible:ring-2 ring-offset-2 ring-primary-600 py-0 px-2 disabled:text-neutral-500",
  },
};
type Theme = keyof typeof themes;

const sizes = {
  sm: "rounded-[4px] px-4 py-2 text-xs",
  md: "rounded-[4px] px-4 py-2.5 text-sm",
  lg: "rounded-[4px] px-4 py-3 text-sm",
};

interface Props<T extends Theme = "default">
  extends ReactTypes.ComponentProps<"button"> {
  theme: T;
  variant: keyof (typeof themes)[T];
  size?: keyof typeof sizes;
}

const Button = <T extends Theme>({
  size = "sm",
  theme,
  variant,
  children,
  className,
  ...props
}: Props<T>) => {
  return (
    <button
      className={cn(sizes[size], themes[theme][variant] as string, className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
