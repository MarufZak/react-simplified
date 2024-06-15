import React from "@marufzak/react";
import type ReactTypes from "@marufzak/react/types";
import { cn } from "../utils";

interface BreadcrumbProps extends ReactTypes.ComponentProps<"nav"> {
  children: ReactTypes.ReactNode;
}

export function Breadcrumb({ children, className, ...props }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className={cn(className)} {...props}>
      {children}
    </nav>
  );
}

interface BreadcrumbListProps extends ReactTypes.ComponentProps<"ol"> {
  children: ReactTypes.ReactNode;
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

interface BreadcrumbItemProps extends ReactTypes.ComponentProps<"li"> {
  children: ReactTypes.ReactNode;
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

interface BreadcrumbLinkProps extends ReactTypes.ComponentProps<"a"> {
  children: ReactTypes.ReactNode;
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

interface BreadcrumbSeparatorProps extends ReactTypes.ComponentProps<"li"> {
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

interface BreadcrumbEllipsisProps extends ReactTypes.ComponentProps<"span"> {}

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
