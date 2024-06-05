import React from "react-simplified";
import type ReactTypes from "react-simplified/types";
import { cn } from "../utils";

const sizes = {
  sm: "h-1 rounded-1",
  lg: "h-2 rounded-[9px]",
};

interface Props extends ReactTypes.ComponentProps<"div"> {
  size: keyof typeof sizes;
  value?: number;
}

const ProgressBar = ({ className, value, size, ...props }: Props) => {
  return (
    <div
      role="progressbar"
      className={cn(
        "overflow-hidden relative bg-neutral-600",
        sizes[size],
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute top-0 left-0 bottom-0 bg-neutral-0",
          sizes[size],
          `w-[${value}%]`,
        )}
      >
        <span className="sr-only">{sizes[size]}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
