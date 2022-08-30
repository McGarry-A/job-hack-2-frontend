import { useState } from "react";
import reedLogo from "../../images/reedLogo.png";
import { useAppDispatch, useAppSelector } from "../../store";
// import { addToLikedJobs } from "../../store/userSlice";
import { motion } from "framer-motion";
import { jobCardVariant } from "../../animations/JobCard";
import { JobInterface } from "../../types/ReedJobsTypes";
import { NavLink } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";
import { addJob } from "../../store/savedJobsSlice";
import { addJob as getNewState } from "../../utils/ManageJobsTable/addJob";
import updateJobs from "../../utils/updateJobs";

interface props {
  el: JobInterface;
  key: number;
}

const HomeJobCard = ({ el }: props) => {
  const [showAddToWishList, setShowAddToWishList] = useState<boolean>(false);
  const toast = useToast();
  const dispatch = useAppDispatch();

  const state = useAppSelector((state) => state.user);
  const jobsState = useAppSelector((state) => state.jobs);

  const handleAddToList = async () => {
    if (state.isLoggedIn === false) {
      toast({
        title: "Error",
        description:
          "Make sure that you are logged in before adding items to your list.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      toast({
        title: "Success",
        description:
          "Successfully added to your list. You can now manage this in the My Jobs tab.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      const jobToAdd = {
        title: el.title,
        company: el.company,
        link: el.url,
        id: String(el.id),
      };

      const newState = getNewState(jobsState, jobToAdd);
      const updatedDB = await updateJobs({
        newJobsState: newState,
        email: state.user.email,
      });

      if (updatedDB) dispatch(addJob(newState));
    }
  };

  const formatSalary = (salary: number): string => {
    return salary
      ? salary.toLocaleString("en-UK", {
          style: "currency",
          currency: "GBP",
        })
      : "NA";
  };

  return (
    <motion.div
      className="border flex hover:cursor-pointer hover:shadow rounded border-l-4 overflow-hidden"
      onMouseEnter={() => setShowAddToWishList(true)}
      onMouseLeave={() => setShowAddToWishList(false)}
      variants={jobCardVariant}
    >
      <NavLink
        to={`/job-profile/${el.id}`}
        className={`w-full transition duration-150`}
      >
        <div className="flex w-full">
          <div className="flex justify-center items-center py-2 px-4 mr-4 flex-shrink-0">
            <img
              src={reedLogo}
              className="w-20 min-w-20"
              alt="search-api-provider-logo"
            />
          </div>
          <div className="flex flex-col justify-center py-2">
            <h5 className="text-2xl tracking-tight text-gray-900 max-w-full">
              {el.title}
            </h5>
            <p className="opacity-50 text-lg">{el.company}</p>
          </div>
          <div className="flex flex-col text-right ml-auto mr-3 justify-center">
            <h6 className="tracking-widest text-sky-400 uppercase text-sm">
              {el.location}
            </h6>
            <p className="text-sm tracking-wide">{formatSalary(el.salary)}</p>
            <p className="text-green-500 uppercase text-sm">{el.contract}</p>
          </div>
        </div>
      </NavLink>
      <div
        className={`transition duration-300 flex justify-center font-semibold items-center bg-sky-500 hover:bg-sky-400 hover:text-rose-500 text-gray-50 text-sm -p-3 hover:shadow ${
          showAddToWishList ? "w-1/12 translate-x-0" : "w-0 translate-x-24"
        }`}
        onClick={() => handleAddToList()}
      >
        <FaHeart />
      </div>
    </motion.div>
  );
};

export default HomeJobCard;
