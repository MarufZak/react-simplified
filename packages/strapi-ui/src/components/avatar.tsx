import React from "@marufzak/react";
import { cn } from "../utils";

interface Props extends React.ComponentProps<"img"> {
  fallback: string;
}

const Avatar = ({ className, fallback, ...props }: Props) => {
  const [showPlaceholder, setShowPlaceholder] = React.useState(true);

  const handleLoad = () => {
    setShowPlaceholder(false);
  };

  return (
    <div className="w-[26px] h-[26px] rounded-full overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-primary-600 to-neutral-0">
      <img
        className={cn(
          "absolute inset-0 bg-cover z-10",
          showPlaceholder ? "hidden" : "block",
          className,
        )}
        onLoad={handleLoad}
        {...props}
      />
      {showPlaceholder && (
        <h3
          role="presentation"
          className="font-semibold text-[10px] uppercase text-neutral-0"
        >
          {fallback.slice(0, 2)}
        </h3>
      )}
    </div>
  );
};

export default Avatar;
