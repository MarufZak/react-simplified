import React from "react-simplified";
import type ReactTypes from "react-simplified/types";
import { cn } from "../utils";

interface ModalProps extends ReactTypes.ComponentProps<"dialog"> {}

// Note: Modal is currently not visible on open=true.
// The bug should be resolved when diffing is done.

const Modal = ({ className, children, open, ...props }: ModalProps) => {
  const modalRef = React.useRef<HTMLDialogElement | null>(null);

  React.useEffect(() => {
    if (!modalRef.current) {
      return;
    }

    if (open) {
      modalRef.current.showModal();
      return;
    }

    modalRef.current.close();
  }, [modalRef, open]);

  return (
    <dialog
      ref={modalRef}
      className={cn(
        "backdrop:bg-black/40 rounded-[4px] open:animate-in open:fade-in-0 open:zoom-in-95",
        className,
      )}
      {...props}
    >
      <div className={cn("w-[420px] rounded-[4px] shadow-lg bg-neutral-0")}>
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
