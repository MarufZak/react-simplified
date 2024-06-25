import React from "@marufzak/react";
import { cn } from "../utils";

const statuses = {
  published: "bg-success-100 border-success-200 text-success-700",
  draft: "bg-secondary-100 border-secondary-200 text-secondary-700",
  modified: "bg-alternative-100 border-alternative-200 text-alternative-700",
};

interface Props extends React.ComponentProps<"div"> {
  type: keyof typeof statuses;
}

const Status = ({ className, children, type, ...props }: Props) => {
  return (
    <div
      className={cn(
        "px-2 py-1 rounded-[4px] border w-max font-semibold text-sm",
        statuses[type],
        className,
      )}
      role="status"
      {...props}
    >
      {children}
    </div>
  );
};

export default Status;
