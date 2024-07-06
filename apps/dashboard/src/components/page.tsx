import React from "@marufzak/react";
import { cn } from "@marufzak/strapi-ui/utils";

interface Props extends React.ComponentProps<"header"> {
  action?: React.ReactNode;
  title: string;
  description?: string;
}

const Page = ({
  className,
  title,
  children,
  description,
  action,
  ...props
}: Props) => {
  return (
    <section experimental__patching={true}>
      <header
        experimental__patching={true}
        className={cn(
          "flex items-center justify-between mb-14 text-neutral-800",
          className,
        )}
        {...props}
      >
        <div>
          <h2 className="text-[32px] leading-10 font-bold">{title}</h2>
          <p className="text-neutral-600">{description}</p>
        </div>
        {action}
      </header>
      {children}
    </section>
  );
};

export default Page;
