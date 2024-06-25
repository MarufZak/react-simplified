import React from "@marufzak/react";

interface Props extends React.ComponentProps<"section"> {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const Block = ({
  children,
  title,
  description,
  className,
  action,
  ...props
}: Props) => {
  return (
    <section
      className={
        "px-8 py-6 rounded-[4px] border-[0.5px] bg-neutral-0 border-neutral-150 shadow-sm"
      }
      {...props}
    >
      <header className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-neutral-800 font-bold">{title}</h3>
          {description ? (
            <p className="text-xs text-neutral-500">{description}</p>
          ) : null}
        </div>
        {action}
      </header>
      <div className={className}>{children}</div>
    </section>
  );
};

export default Block;
