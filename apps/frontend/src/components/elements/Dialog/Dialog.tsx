import clsx from "clsx";
import { ReactNode } from "react";

import { Modal } from "@/components/elements";

interface Props {
  isOpen: boolean;
  title?: string;
  message: string;
  children?: ReactNode;
  onRequestClose: () => void;
}

export const Dialog = ({
  isOpen,
  title = "",
  message,
  children,
  onRequestClose,
}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          inset: "0 40px",
          margin: "auto",
          height: "fit-content",
        },
      }}
    >
      <div className={clsx("flex", "justify-between", "items-center", "mb-3")}>
        <p className={clsx("font-bold")}>{title}</p>
      </div>

      <div>{message}</div>

      <div>{children}</div>
    </Modal>
  );
};

Dialog.displayName = "Dialog";
