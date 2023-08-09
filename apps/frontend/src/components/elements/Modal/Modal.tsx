import ReactModal, { Props } from "react-modal";

ReactModal.setAppElement("#__next");

export const Modal = (props: Props) => {
  return <ReactModal {...props}>{props.children}</ReactModal>;
};
