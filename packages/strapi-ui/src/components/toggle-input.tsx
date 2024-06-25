import React from "@marufzak/react";
import { cn } from "../utils";

interface Props extends Omit<React.ComponentProps<"input">, "type" | "id"> {
  onLabel: string;
  offLabel: string;
  label?: string;
  hint?: string;
}

const ToggleInput = ({
  className,
  offLabel,
  onLabel,
  label,
  hint,
  ...props
}: Props) => {
  const id = React.useId();

  return (
    <div>
      {label ? (
        <label className="font-bold text-xs mb-1 text-neutral-800" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <input
        className={cn(`h-0 w-0 invisible peer`, className)}
        type="checkbox"
        id={id}
        {...props}
      />
      <label
        className={cn(
          `cursor-pointer bg-neutral-100 text-neutral-600 h-10 p-1 w-max rounded-[4px] border border-neutral-200 flex items-center gap-1 peer-checked:[&>span:last-child]:bg-neutral-0 peer-checked:[&>span:last-child]:border-neutral-150 peer-checked:[&>span:last-child]:text-primary-600 peer-checked:[&>span:first-child]:text-neutral-600 [&>span:first-child]:text-danger-600 peer-checked:[&>span:first-child]:bg-transparent [&>span:first-child]:bg-neutral-0 peer-checked:[&>span:first-child]:border-transparent [&>span:first-child]:border-neutral-150`,
        )}
        htmlFor={id}
      >
        <ToggleInputValue key={`${id}-value-1`}>{offLabel}</ToggleInputValue>
        <ToggleInputValue key={`${id}-value-2`}>{onLabel}</ToggleInputValue>
      </label>
      {hint ? <p className="text-xs text-neutral-600 mt-1">{hint}</p> : null}
    </div>
  );
};

interface ToggleInputValueProps extends React.ComponentProps<"span"> {}

const ToggleInputValue = ({
  className,
  children,
  ...props
}: ToggleInputValueProps) => {
  return (
    <span
      className={cn(
        "rounded-[4px] border border-transparent h-full px-[13.5px] grid place-items-center uppercase text-xs font-bold",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default ToggleInput;
