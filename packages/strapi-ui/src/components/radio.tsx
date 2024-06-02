import React from "react-simplified";
import type ReactTypes from "react-simplified/types";
import { cn } from "../utils";

interface Props extends Omit<ReactTypes.ComponentProps<"input">, "type"> {}

const Radio = ({ className, ...props }: Props) => {
  return (
    <input
      type="radio"
      className={cn(
        "w-5 h-5 flex items-center justify-center appearance-none outline-none border border-neutral-300 rounded-full focus-visible:outline-none focus-visible:ring-2 ring-offset-2 ring-primary-600 disabled:bg-neutral-200 checked:ring-0 focus-visible:checked:ring-0 checked:border-primary-600 before:hidden checked:before:block before:w-3 before:h-3 before:rounded-full before:bg-primary-600",
        className,
      )}
      {...props}
    />
  );
};

export default Radio;
