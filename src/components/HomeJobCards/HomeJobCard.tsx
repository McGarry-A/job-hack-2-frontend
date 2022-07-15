import { useState } from "react";
import AdzunaLogo from "../../images/adzunaLogo.png";
import { useAppDispatch, useAppSelector } from "../../store";
import { addToLikedJobs } from "../../store/userSlice";
import Modal from "../Modal/Modal";
import { motion } from "framer-motion";
import { jobCardVariant } from "../../Animations/JobCard";
import { setNotification } from "../../store/notificationSlice";
import { JobInterface } from "../../hooks/jobs.model";

interface props {
  el: JobInterface;
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
      company: el.company,
      salary: el.salary,
      location: el.location,
      description: el.description,
    };

    dispatch(addToLikedJobs(jobToAdd));
  };

  const renderModal = (job: JobInterface) => {
    const { title, description, company, salary, url, id, location } = job;

    return (
      <Modal isHidden={modalIsHidden} setIsHidden={setModalIsHidden}>
        <h3 className="text-xl text-sky-600 font-semibold">{title}</h3>
        <h5 className="text-sm mt-1">At {company}</h5>
        <h5 className="text-right text-sm opacity-70">{location}</h5>
        <h5 className="text-right text-sm opacity-70 mt-1">
          Salary up to{" "}
          <span className="text-sky-600 font-semibold">£{salary}</span>
        </h5>
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
          <a href={url}>
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
          <img
            src={AdzunaLogo}
            className="w-20"
            alt="search-api-provider-logo"
          />
        </div>
        <div className="flex flex-col justify-center py-2">
          <h5 className="text-2xl tracking-tight text-gray-900 whitespace-nowrap">
            {el.title}
          </h5>
          <p className="opacity-50 text-lg">{el.company}</p>
        </div>
        <div className="flex flex-col text-right ml-auto mr-3 py-2">
          <h6 className="font-bold tracking-wide text-sky-400">
            {el.location}
          </h6>
          <p>£{el.salary}</p>
          <p className="text-green-500 font-bold uppercase text-sm">{el.id}</p>
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
