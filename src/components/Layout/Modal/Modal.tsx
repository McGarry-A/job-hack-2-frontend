import React, { Dispatch, SetStateAction } from "react";
import ReactDOM from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import { useAppDispatch } from "../../../store";

export interface Props {
  children: React.ReactNode;
  isHidden: boolean;
  setIsHidden?: Dispatch<SetStateAction<boolean>>;
}

const Modal: React.FC<Props> = ({ children, isHidden, setIsHidden }) => {
  const target = document.getElementById("root")!;
  const dispatch = useAppDispatch();

  return isHidden === true ? (
    <></>
  ) : (
    ReactDOM.createPortal(
      <motion.div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-40">
        <motion.div
          className="max-w-xl w-full bg-white rounded-sm shadow-sm z-50"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative px-8 py-10">
            <button className="absolute right-3 top-3">
              <AiOutlineClose
                size={"1.2rem"}
                className="opacity-50"
                onClick={() => {
                  if (setIsHidden) setIsHidden(true);
                }}
              />
            </button>
            {children}
          </div>
        </motion.div>
      </motion.div>,
      target
    )
  );
};

export default Modal;
