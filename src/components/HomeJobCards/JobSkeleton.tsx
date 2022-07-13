import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";
import { jobCardVariant } from "../../Animations/JobCard";
import "react-loading-skeleton/dist/skeleton.css";

const JobSkeleton = () => {
  return (
    <motion.div
      className="border flex hover:cursor-pointer hover:shadow rounded border-l-4 overflow-hidden"
      variants={jobCardVariant}
    >
      <div className="flex w-full">
        <div className="flex justify-center items-center py-2 px-4 mr-4">
          <Skeleton circle />
        </div>
        <div className="flex flex-col justify-center py-2">
          <h5 className="text-2xl tracking-tight text-gray-900 whitespace-nowrap">
            <Skeleton />
          </h5>
          <p className="opacity-50 text-lg">
            <Skeleton />
          </p>
        </div>
        <div className="flex flex-col text-right ml-auto mr-3 py-2">
          <h6 className="font-bold tracking-wide text-sky-400">
            <Skeleton />
          </h6>
          <p>
            <Skeleton />
          </p>
          <p className="text-green-500 font-bold uppercase text-sm">
            <Skeleton />
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default JobSkeleton;
