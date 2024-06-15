import React from "@marufzak/react";
import type ReactTypes from "@marufzak/react/types";
import { cn } from "../utils";

const themes = {
  default: {
    primary:
      "text-neutral-0 bg-primary-600 hover:bg-primary-500 active:bg-primary-700",
    secondary:
      "text-primary-600 bg-primary-100 hover:bg-neutral-0 border border-primary-200 active:border-primary-700",
    tertiary:
      "text-primary-800 bg-neutral-0 hover:bg-neutral-100 border border-neutral-200 active:bg-neutral-150",
  },
  success: {
    primary:
      "text-neutral-0 bg-success-600 hover:bg-success-500 active:bg-success-700",
    secondary:
      "text-success-600 bg-success-100 border border-success-200 hover:bg-neutral-0 active:border-success-700",
  },
  danger: {
    primary:
      "text-neutral-0 bg-danger-600 hover:bg-danger-500 active:bg-danger-700",
    secondary:
      "text-danger-600 bg-danger-100 border border-danger-200 hover:bg-neutral-0 active:border-danger-700",
  },
  text: {
    primary:
      "text-regular text-primary-600 hover:text-primary-500 py-0 px-2 disabled:text-neutral-500",
  },
};

const sizes = {
  sm: "rounded-[4px] px-4 py-2 text-xs",
  md: "rounded-[4px] px-4 py-2.5 text-sm",
  lg: "rounded-[4px] px-4 py-3 text-sm",
  icon: "rounded-[4px] w-8 h-8 grid place-items-center text-sm",
};

interface Props<T extends keyof typeof themes>
  extends ReactTypes.ComponentProps<"button"> {
  theme: T;
  variant: keyof (typeof themes)[T];
  size?: keyof typeof sizes;
}

const Button = <T extends keyof typeof themes>({
  size = "sm",
  theme,
  variant,
  children,
  className,
  ...props
}: Props<T>) => {
  return (
    <button
      className={cn(
        "font-bold focus-visible:outline-none focus-visible:ring-2 ring-offset-2 ring-primary-600 disabled:bg-neutral-150 disabled:text-neutral-600 disabled:border disabled:border-neutral-200 focus-visible:border-transparent",
        sizes[size],
        themes[theme][variant] as string,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
