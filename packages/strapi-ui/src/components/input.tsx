import React from "@marufzak/react";
import { EyeCloseIcon, EyeOpenIcon } from "../icons";
import { cn } from "../utils";

interface TextInputProps extends Omit<React.ComponentProps<"input">, "id"> {
  label: string;
  description?: string;
}

// user-invalid pseudo-class is not supported in tailwindcss yet https://github.com/tailwindlabs/tailwindcss/pull/12370

export const TextInput = ({
  label,
  description,
  className,
  ...props
}: TextInputProps) => {
  const id = React.useId();

  return (
    <div className={cn("flex flex-col", className)}>
      <label className="text-xs text-neutral-800 mb-1 font-bold" htmlFor={id}>
        {label}
      </label>
      <input
        className="border border-neutral-200 rounded-[4px] bg-neutral-0 text-sm placeholder:text-neutral-600 text-neutral-800 h-10 focus-visible:border-2 focus-visible:border-primary-600 focus-visible:pl-[15px] outline-none px-4 disabled:bg-neutral-150 disabled:text-neutral-600"
        id={id}
        {...props}
      />
      {description && (
        <p className="text-xs text-neutral-600 mt-1">{description}</p>
      )}
    </div>
  );
};

interface PasswordInputProps extends Omit<TextInputProps, "type" | "id"> {
  label: string;
  description?: string;
}

export const PasswordInput = ({
  label,
  description,
  disabled,
  className,
  ...props
}: PasswordInputProps) => {
  const id = React.useId();
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className={cn("flex flex-col", className)}>
      <label className="text-xs text-neutral-800 mb-1 font-bold" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className="w-full border border-neutral-200 rounded-[4px] bg-neutral-0 text-sm placeholder:text-neutral-600 text-neutral-800 h-10 focus-visible:border-2 focus-visible:border-primary-600 focus-visible:pl-[15px] outline-none px-4 disabled:bg-neutral-150 disabled:text-neutral-600"
          id={id}
          disabled={disabled}
          {...props}
        />
        <button
          type="button"
          disabled={disabled}
          className="absolute right-3 top-1/2 -translate-y-1/2 fill-neutral-600"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeCloseIcon key={`${id}-eye-close`} width={16} height={16} />
          ) : (
            <EyeOpenIcon key={`${id}-eye-open`} width={16} height={16} />
          )}
        </button>
      </div>
      {description && (
        <p className="text-xs text-neutral-600 mt-1">{description}</p>
      )}
    </div>
  );
};
