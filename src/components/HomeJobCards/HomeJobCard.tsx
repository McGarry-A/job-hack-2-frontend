import { useState } from "react";
import reedLogo from "../../images/reedLogo.png";
import { useAppDispatch, useAppSelector } from "../../store";
import { addToLikedJobs } from "../../store/userSlice";
import { motion } from "framer-motion";
import { jobCardVariant } from "../../Animations/JobCard";
import { setNotification } from "../../store/notificationSlice";
import { JobInterface } from "../../hooks/jobs.model";
import { NavLink } from "react-router-dom";

interface props {
  el: JobInterface;
  key: number;
}

const HomeJobCard = ({ el }: props) => {
  const [showAddToWishList, setShowAddToWishList] = useState<boolean>(false);

  const state = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleAddToList = () => {
    if (state.isLoggedIn === false) {
      dispatch(
        setNotification({
          state: false,
          status: "error",
          message:
            "Please ensure that you are logged in before adding items to your wishlist.",
        })
      );
    } else {
      dispatch(
        setNotification({
          state: false,
          status: "success",
          message:
            "Successfully added to your list. You can now manage this in the My Jobs tab.",
        })
      );

      const jobToAdd = {
        title: el.title,
        company: el.company,
        salary: el.salary,
        location: el.location,
        description: el.description,
      };

      dispatch(addToLikedJobs(jobToAdd));
    }
  };

  return (
    <motion.div
      className="border flex hover:cursor-pointer hover:shadow rounded border-l-4 overflow-hidden"
      onMouseEnter={() => setShowAddToWishList(true)}
      onMouseLeave={() => setShowAddToWishList(false)}
      variants={jobCardVariant}
    >
      <NavLink to={`/job-profile/${el.id}`} className="w-full">
        <div className="flex w-full">
          <div className="flex justify-center items-center py-2 px-4 mr-4">
            <img
              src={reedLogo}
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
            <p className="text-green-500 font-bold uppercase text-sm">
              {el.id}
            </p>
          </div>
        </div>
      </NavLink>
      <div
        className={`transition duration-300 flex justify-center font-semibold items-center bg-sky-500 hover:bg-sky-400 text-gray-100 text-sm -p-3 ${
          showAddToWishList ? "w-1/12 translate-x-0" : "w-0 translate-x-24"
        }`}
        onClick={() => handleAddToList()}
      >
        Add To List
      </div>
    </motion.div>
  );
};

export default HomeJobCard;
