import { useState } from "react";
import { AiFillApple } from "react-icons/ai";
import { JobType } from "../../hooks/useAdzuna";
import { useAppDispatch, useAppSelector } from "../../store";
import { addToLikedJobs } from "../../store/userSlice";
import Modal from "../Modal/Modal";
import { motion } from "framer-motion";
import { jobCardVariant } from "../../Animations/JobCard";
import { setNotification } from "../../store/notificationSlice";

interface props {
  el: JobType;
  key: number;
}

const HomeJobCard = ({ el }: props) => {
  const [modalIsHidden, setModalIsHidden] = useState<boolean>(true);
  const [showAddToWishList, setShowAddToWishList] = useState<boolean>(false);

  const state = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleAddToList = () => {
    if (!state.isLoggedIn) {
      dispatch(
        setNotification({
          state: false,
          status: "error",
          message:
            "Please ensure that you are logged in before adding items to your wishlist.",
        })
      );
    }

    const jobToAdd = {
      title: el.title,
      company: el.company.display_name,
      salary: el.salary_max,
      location: el.location.display_name,
      description: el.description,
    };

    dispatch(addToLikedJobs(jobToAdd));
  };

  const renderModal = (job: JobType) => {
    const {
      title,
      description,
      company: { display_name: company_name },
      salary_max,
      redirect_url,
      contract_type,
      location: { display_name: location_name },
    } = job;

    return (
      <Modal isHidden={modalIsHidden} setIsHidden={setModalIsHidden}>
        <h3 className="text-xl text-sky-600 font-semibold">{title}</h3>
        <h5 className="text-sm mt-1">At {company_name}</h5>
        <h5 className="text-right text-sm opacity-70">{location_name}</h5>
        <h5 className="text-right text-sm opacity-70 mt-1">
          Salary up to{" "}
          <span className="text-sky-600 font-semibold">£{salary_max}</span>
        </h5>
        {contract_type && (
          <h5 className="text-right text-sm opacity-70 mt-1">
            On a{" "}
            <span className="text-sky-600">
              {contract_type.replace("_", "-")}
            </span>{" "}
            contract
          </h5>
        )}

        <p className="mt-2 text-sm text-justify">{description}</p>
        <div className="w-full flex justify-end space-x-4 mt-2">
          <button
            className="rounded-sm text-sm px-3 py-2 border-2 border-sky-500 text-sky-500 hover:text-sky-400 hover:border-sky-400"
            onClick={() => {
              handleAddToList();
              setModalIsHidden(!modalIsHidden);
            }}
          >
            Add to list
          </button>
          <a href={redirect_url}>
            <button className="rounded-sm text-sm px-3 py-2 border border-sky-500 bg-sky-500 text-gray-50 hover:bg-sky-400 hover:border-sky-400">
              See More
            </button>
          </a>
        </div>
      </Modal>
    );
  };

  return (
    <motion.div
      className="border flex hover:cursor-pointer hover:shadow rounded border-l-4 overflow-hidden"
      onMouseEnter={() => setShowAddToWishList(true)}
      onMouseLeave={() => setShowAddToWishList(false)}
      variants={jobCardVariant}
    >
      <div onClick={() => setModalIsHidden(false)} className="flex w-full">
        <div className="flex justify-center items-center py-2 px-4 mr-4">
          <AiFillApple size="3rem" />
        </div>
        <div className="flex flex-col justify-center py-2">
          <h5 className="text-2xl tracking-tight text-gray-900 whitespace-nowrap">
            {el.title}
          </h5>
          <p className="opacity-50 text-lg">{el.company.display_name}</p>
        </div>
        <div className="flex flex-col text-right ml-auto mr-3 py-2">
          <h6 className="font-bold tracking-wide text-sky-400">
            {el.location.display_name}
          </h6>
          <p>£{el.salary_max}</p>
          <p className="text-green-500 font-bold uppercase text-sm">
            {el.contract_type && el.contract_type.replace("_", "-")}
          </p>
        </div>
      </div>
      <div
        className={`transition duration-150 flex justify-center font-semibold items-center bg-sky-500 hover:bg-sky-400 text-gray-100 text-sm -p-3 ${
          showAddToWishList ? "w-1/12 translate-x-0" : "w-0 translate-x-10"
        }`}
        onClick={() => handleAddToList()}
      >
        Add To List
      </div>
      {renderModal(el)}
    </motion.div>
  );
};

export default HomeJobCard;
