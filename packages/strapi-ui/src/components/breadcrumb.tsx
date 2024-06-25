import React from "@marufzak/react";
import { cn } from "../utils";

interface BreadcrumbProps extends React.ComponentProps<"nav"> {
  children: React.ReactNode;
}

export function Breadcrumb({ children, className, ...props }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className={cn(className)} {...props}>
      {children}
    </nav>
  );
}

interface BreadcrumbListProps extends React.ComponentProps<"ol"> {
  children: React.ReactNode;
}

export function BreadcrumbList({
  children,
  className,
  ...props
}: BreadcrumbListProps) {
  return (
    <ol className={cn("flex gap-3 items-center", className)} {...props}>
      {children}
    </ol>
  );
}

interface BreadcrumbItemProps extends React.ComponentProps<"li"> {
  children: React.ReactNode;
}

export function BreadcrumbItem({
  className,
  children,
  ...props
}: BreadcrumbItemProps) {
  return (
    <li className={cn(className)} {...props}>
      {children}
    </li>
  );
}

interface BreadcrumbLinkProps extends React.ComponentProps<"a"> {
  children: React.ReactNode;
  isActive?: boolean;
}

export function BreadcrumbLink({
  className,
  children,
  isActive = false,
  ...props
}: BreadcrumbLinkProps) {
  return (
    <a
      className={cn(
        "text-xs",
        isActive ? "font-semibold text-neutral-800" : "text-neutral-600",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

interface BreadcrumbSeparatorProps extends React.ComponentProps<"li"> {
  children?: string;
}

export function BreadcrumbSeparator({
  children = "/",
  className,
  ...props
}: BreadcrumbSeparatorProps) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn("text-xs text-neutral-500", className)}
      {...props}
    >
      /
    </li>
  );
}

interface BreadcrumbEllipsisProps extends React.ComponentProps<"span"> {}

export function BreadcrumbEllipsis({
  children,
  className,
  ...props
}: BreadcrumbEllipsisProps) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex h-3 w-3 items-center justify-center text-neutral-600 text-xs",
        className,
      )}
      {...props}
    >
      ...
      <span className="sr-only">More</span>
    </span>
  );
}
