import React from "@marufzak/react";
import { cn } from "../utils";
import MagnifierIcon from "../icons/magnifier";

interface Props extends Omit<React.ComponentProps<"input">, "type"> {}

const SearchBar = ({ className, disabled, ...props }: Props) => {
  return (
    // prevent shift on focus because of 2px border on focus and 1px on idle
    <div experimental__patching={true} className="relative">
      <input
        className={cn(
          "py-[9px] pr-3 pl-[30px] rounded-[4px] border-1 border-neutral-150 bg-neutral-0 placeholder:text-neutral-500 text-xs text-neutral-800 outline-none focus-visible:border-2 focus-visible:border-primary-600 focus-visible:py-2 focus-visible:pl-[29px] disabled:bg-neutral-150 disabled:border-1 disabled:border-neutral-200 [&:focus-visible+svg]:fill-primary-600",
          className,
        )}
        type="search"
        disabled={disabled}
        experimental__patching={true}
        {...props}
      />
      <MagnifierIcon
        width={10}
        height={10}
        className="absolute left-3 top-1/2 -translate-y-1/2 fill-neutral-500"
      />
      {/* didn't implement custom X, because i had to make search bar controlled, which is not correct for consumers. Also making it conditionally controlled based on props is not correct (single source of truth principle) */}
      <span className="sr-only">Results appear as you write</span>
    </div>
  );
};

export default SearchBar;
