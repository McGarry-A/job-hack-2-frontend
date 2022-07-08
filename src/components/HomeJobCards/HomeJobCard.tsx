import { useState } from "react";
import { AiFillApple } from "react-icons/ai";
import { JobType } from "../../hooks/useAdzuna";
import { useAppDispatch } from "../../store";
import { addToLikedJobs } from "../../store/userSlice";

interface props {
  el: JobType;
  key: number;
}

const HomeJobCard = ({ el, key }: props) => {
  const [showAddToWishList, setShowAddToWishList] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleAddToList = () => {
    const jobToAdd = {
      title: el.title,
      company: el.company.display_name,
      salary: el.salary_max,
      location: el.location.display_name,
      description: el.description,
    };

    dispatch(addToLikedJobs(jobToAdd));
  };

  return (
    <div
      key={key}
      className="border flex hover:cursor-pointer hover:shadow rounded border-l-4 overflow-hidden"
      onMouseEnter={() => setShowAddToWishList(true)}
      onMouseLeave={() => setShowAddToWishList(false)}
    >
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
      <div
        className={`transition duration-150 flex justify-center font-semibold items-center bg-sky-500 hover:bg-sky-400 text-gray-100 text-sm -p-3 ${
          showAddToWishList ? "w-1/12 translate-x-0" : "w-0 translate-x-10"
        }`}
        onClick={() => handleAddToList()}
      >
        Add To List
      </div>
    </div>
  );
};

export default HomeJobCard;
