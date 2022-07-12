import React, { Dispatch, SetStateAction } from "react";
import ReactDOM from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

export interface Props {
  children: React.ReactNode;
  isHidden: boolean;
  setIsHidden: Dispatch<SetStateAction<boolean>>;
}

const Modal: React.FC<Props> = ({ children, isHidden, setIsHidden }) => {
  const target = document.getElementById("root")!;

  return isHidden === true ? (
    <></>
  ) : (
    ReactDOM.createPortal(
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-40">
        <div className="max-w-xl w-full bg-white rounded-sm shadow-sm z-50">
          <div className="relative px-8 py-10">
            <button className="absolute right-3 top-3">
              <AiOutlineClose
                size={"1.2rem"}
                className="opacity-50"
                onClick={() => setIsHidden(true)}
              />
            </button>
            {children}
          </div>
        </div>
      </div>,
      target
    )
  );
};

export default Modal;
