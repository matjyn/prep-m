import React from "react";
import { createPortal } from "react-dom";
import "./modal.styles.css";

interface ModalProps<T = unknown> {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  data?: T;
  container?: Element | null;
}

function Modal<T = unknown>({
  isOpen,
  onClose,
  children,
  container = document.body,
}: ModalProps<T>) {
  if (!isOpen || !container) return null;

  return createPortal(
    <div
      className="modal-overlay animateIn"
      onClick={onClose}
    >
      <div
        className="modal-content animateIn"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    container,
  );
}

export { Modal };
