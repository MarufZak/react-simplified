import React from "@marufzak/react";
import { cn } from "../utils";

interface Props extends Omit<React.ComponentProps<"input">, "type"> {}

const Checkbox = ({ className, ...props }: Props) => {
  return (
    <input
      type="checkbox"
      className={cn(
        `relative appearance-none overflow-hidden border border-neutral-300 checked:border-primary-600 disabled:checked:border-neutral-300 w-5 h-5 rounded-[4px] disabled:bg-neutral-200 outline-none focus-visible:ring-2 ring-offset-2 ring-primary-600 before:absolute before:inset-0 before:scale-0 checked:before:scale-100 checked:before:bg-primary-600 disabled:checked:before:bg-neutral-200 after:flex after:absolute after:inset-0 after:items-center after:justify-center checked:after:icon-check-white disabled:checked:after:icon-check-gray`,
        className,
      )}
      experimental__patching={true}
      {...props}
    />
  );
};

export default Checkbox;
