import React from "react-simplified";
import type ReactTypes from "react-simplified/types";
import { cn } from "../utils";
import { InfoIcon, CloseIcon, CircleCheckIcon, WarningIcon } from "../icons";

const sizes = {
  sm: {
    info: "flex-row items-center gap-1",
    leftIcon: "flex items-center",
    rightIcon: "flex items-center",
  },
  lg: {
    info: "flex-col gap-2",
    leftIcon: "",
    rightIcon: "h-max",
  },
};

const themes = {
  primary: {
    icon: InfoIcon,
    iconClassname: "fill-primary-600",
    wrapper: "bg-primary-100 border-primary-200",
    action: "text-primary-600 fill-primary-600",
  },
  success: {
    icon: CircleCheckIcon,
    iconClassname: "fill-success-600",
    wrapper: "bg-success-100 border-success-200",
    action: "text-success-600 fill-success-600",
  },
  warning: {
    icon: WarningIcon,
    iconClassname: "fill-warning-600",
    wrapper: "bg-warning-100 border-warning-200",
    action: "text-warning-600 fill-warning-600",
  },
  danger: {
    icon: WarningIcon,
    iconClassname: "fill-danger-600",
    wrapper: "bg-danger-100 border-danger-200",
    action: "text-danger-600 fill-danger-600",
  },
};

interface Props extends ReactTypes.ComponentProps<"div"> {
  title: string;
  description: string;
  size: keyof typeof sizes;
  theme: keyof typeof themes;
  action?: ReactTypes.ReactNode;
}

const Alert = ({
  title,
  description,
  size,
  className,
  theme,
  action,
  ...props
}: Props) => {
  const [isOpened, setIsOpened] = React.useState(true);

  const handleClose = () => {
    setIsOpened(false);
  };

  const Icon = themes[theme].icon;

  return (
    <div
      className={cn(
        "p-5 rounded-[4px] border shadow-lg gap-3.5",
        themes[theme].wrapper,
        isOpened ? "flex" : "hidden",
        className,
      )}
      role="alert"
      {...props}
    >
      <Icon
        width={20}
        height={20}
        className={cn(
          "shrink-0",
          themes[theme].iconClassname,
          sizes[size].leftIcon,
        )}
      />
      <div className={cn("flex grow", sizes[size].info)}>
        <h2 className="text-sm text-neutral-800 font-bold">{title}</h2>
        <p className="text-sm text-neutral-800">{description}</p>
        {action && (
          <div
            className={cn(
              "text-xs",
              size === "sm" ? "grow flex justify-end" : "mt-1",
              themes[theme].action,
            )}
          >
            {action}
          </div>
        )}
      </div>
      <button onClick={handleClose} className={cn("", sizes[size].rightIcon)}>
        <CloseIcon width={12} height={12} className="fill-neutral-700" />
      </button>
    </div>
  );
};

export default Alert;
