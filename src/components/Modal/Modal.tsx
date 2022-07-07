import React from "react";
import ReactDOM from "react-dom";

const Modal: React.FC<Props> = ({ children, isHidden }) => {
  const target = document.getElementById("root")!;

  return isHidden ? (
    <div className="hidden"></div>
  ) : (
    ReactDOM.createPortal(
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
        {children}
      </div>,
      target
    )
  );
};

export interface Props {
  children: React.ReactNode;
  isHidden: boolean;
}

export default Modal;
