import Hero from "../components/Hero/Hero";
import { AiOutlineSearch } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
const Home = () => {
  const renderForm = () => {
    return (
      <div className="grid grid-cols-4 gap-3 w-4/5 mx-auto bg-white p-4 shadow">
        <div className="flex border py-2 items-center px-2 text-lg">
          <AiOutlineSearch className="mr-2 text-2xl" />
          <input placeholder="Job Type" className="w-full focus:outline-none" />
        </div>
        <div className="flex border py-2 items-center px-2 text-lg">
          <GoLocation className="mr-2 text-2xl" />
          <input placeholder="Location" className="w-full focus:outline-none" />
        </div>
        <div className="flex border py-2 items-center px-2 text-lg">
          <HiOutlineOfficeBuilding className="mr-2 text-2xl" />
          <select placeholder="input" className="w-full focus:outline-none">
            <option defaultChecked>Where would you like to work from?</option>
            <option>Office</option>
            <option>Remote</option>
            <option>Hybrid</option>
          </select>
        </div>
        <button className="border bg-blue-500 text-gray-50">Search Jobs</button>
      </div>
    );
  };

  return (
    <div>
      <Hero />
      <div className="bg-gray-50 relative">{renderForm()}</div>
    </div>
  );
};

export default Home;
