import ReactModal, { Props } from "react-modal";

ReactModal.setAppElement("#__next");

export const Modal = ({ children, isOpen, onRequestClose }: Props) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
    >
      {children}
    </ReactModal>
  );
};
