import React from "@marufzak/react";
import { cn } from "../utils";

interface Props extends React.ComponentProps<"div"> {}

const Divider = ({ className, ...props }: Props) => {
  // don't have children because they'd be presentational
  return (
    <div
      className={cn("h-[1px] bg-neutral-150 shrink-0", className)}
      role="separator"
      {...props}
    />
  );
};

export default Divider;
