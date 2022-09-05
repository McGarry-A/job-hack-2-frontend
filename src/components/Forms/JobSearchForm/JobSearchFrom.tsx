import { Dispatch, RefObject, SetStateAction } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { BiSortUp } from "react-icons/bi";

interface props {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  titleRef: RefObject<HTMLInputElement>;
  locationRef: RefObject<HTMLInputElement>;
  setSort: Dispatch<SetStateAction<string | null>>;
}

const JobSearchForm = ({
  handleFormSubmit,
  titleRef,
  locationRef,
  setSort,
}: props) => {
  return (
    <form
      className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2"
      onSubmit={(e) => handleFormSubmit(e)}
    >
      <div className="flex flex-col">
        <p className="opacity-60">Job Title</p>
        <div className="flex border py-2 items-center px-2 text-sm lg:text-lg">
          <AiOutlineSearch className="mr-2 text-2xl" />
          <input
            className="w-full focus:outline-none text-[16px]"
            ref={titleRef}
            placeholder="Front-end Developer"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <p className="opacity-60">Location</p>
        <div className="flex border py-2 items-center px-2 text-sm lg:text-lg">
          <GoLocation className="mr-2 text-2xl" />
          <input
            className="w-full focus:outline-none text-[16px]"
            ref={locationRef}
            placeholder="Manchester"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <p className="opacity-60">Sort</p>
        <div className="flex border py-2 items-center px-2 text-sm lg:text-lg">
          <BiSortUp className="mr-2 text-2xl" />
          <select
            placeholder="input"
            className="w-full focus:outline-none opacity-50 text-[16px]"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value={""}>Most Relevant</option>
            <option value={"sort_alpha"}>Alphabetically (A - Z)</option>
            <option value={"sort_ascending"}>Salary (Acending)</option>
            <option value={"sort_decsending"}>Salary (Decending)</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col pb-1">
        <div className="invisible"></div>
        <button
          className="flex justify-center items-center border border-sky-500 bg-sky-500 text-gray-50 font-semibold uppercase tracking-wide mt-auto py-2 px-2 text-sm lg:text-lg h-[42px] hover:bg-sky-400 hover:border-sky-400"
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default JobSearchForm;
