import React from "react-simplified";
import type ReactTypes from "react-simplified/types";
import { cn } from "../utils";

interface ModalProps extends ReactTypes.ComponentProps<"dialog"> {}

const Modal = ({ className, children, open, ...props }: ModalProps) => {
  return (
    <dialog
      open={open}
      className={cn(
        "duration-200 fixed w-full h-full inset-0 place-items-center bg-black/15 overflow-hidden backdrop-blur-sm",
        open && "grid",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "w-[420px] rounded-[4px] shadow-lg bg-neutral-0",
          open
            ? "grid animate-in fade-in-0 zoom-in-95"
            : "animate-out fade-out-0 zoom-out-95",
        )}
      >
        {children}
      </div>
    </dialog>
  );
};

interface ModalHeaderProps extends ReactTypes.ComponentProps<"header"> {}

const ModalHeader = ({ children, className, ...props }: ModalHeaderProps) => {
  return (
    <header
      className={cn(
        "px-4 py-6 border-b border-neutral-150 flex flex-col justify-center",
        className,
      )}
      {...props}
    >
      {children}
    </header>
  );
};

interface ModalContentProps extends ReactTypes.ComponentProps<"div"> {}

const ModalContent = ({ className, children, ...props }: ModalContentProps) => {
  return (
    <div className={cn("px-4 py-6", className)} {...props}>
      {children}
    </div>
  );
};

interface ModalFooterProps extends ReactTypes.ComponentProps<"footer"> {}

const ModalFooter = ({ children, className, ...props }: ModalFooterProps) => {
  return (
    <footer
      className={cn("p-4 border-t border-neutral-150", className)}
      {...props}
    >
      {children}
    </footer>
  );
};

export { Modal, ModalHeader, ModalContent, ModalFooter };
