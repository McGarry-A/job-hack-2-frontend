import Hero from "../components/Hero/Hero";
import { AiOutlineSearch } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { useState } from "react";

type workLocationType = "office" | "remote" | "hybrid" | undefined;
const Home = () => {
  const [job, setJob] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [workLocation, setWorkLocation] = useState<workLocationType>();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(job, location, workLocation);
  };

  const renderOptions = () => {
    const options = [
      "Freelance",
      "Full-time",
      "Part-time",
      "Graduate",
      "Internship",
    ];
    return (
      <div className="space-x-4 flex my-3 items-center">
        {options.map((el, index) => {
          return (
            <div key={index} className="flex items-center border py-2 px-4 rounded bg-blue-300">
              <input type="checkbox" checked className=""/>
              <p className="ml-2 mt-1 text-gray-50">{el}</p>
            </div>
          );
        })}
      </div>
    );
  };

  const renderForm = () => {
    return (
      <div className="w-4/5 mx-auto bg-white p-4 shadow rounded absolute border-2 border-red-600 -top-10 left-0 right-0">
        <form
          className="grid grid-cols-4 gap-3"
          onSubmit={(e) => handleFormSubmit(e)}
        >
          <div className="flex border py-2 items-center px-2 text-lg">
            <AiOutlineSearch className="mr-2 text-2xl" />
            <input
              placeholder="Job Type"
              className="w-full focus:outline-none"
              onChange={(e) => setJob(e.target.value)}
            />
          </div>
          <div className="flex border py-2 items-center px-2 text-lg">
            <GoLocation className="mr-2 text-2xl" />
            <input
              placeholder="Location"
              className="w-full focus:outline-none"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="flex border py-2 items-center px-2 text-lg">
            <HiOutlineOfficeBuilding className="mr-2 text-2xl" />
            <select
              placeholder="input"
              className="w-full focus:outline-none"
              onChange={(e) =>
                setWorkLocation(e.target.value as workLocationType)
              }
            >
              <option defaultChecked value={""}>
                Where would you like to work from?
              </option>
              <option value={"office"}>Office</option>
              <option value={"remote"}>Remote</option>
              <option value={"hybrid"}>Hybrid</option>
            </select>
          </div>
          <button className="border bg-blue-500 text-gray-50" type="submit">
            Search Jobs
          </button>
        </form>
        {renderOptions()}
      </div>
    );
  };

  return (
    <div>
      <Hero />
      <div className="bg-gray-50 relative border-black border-2 h-screen">
        {renderForm()}
      </div>
    </div>
  );
};

export default Home;
