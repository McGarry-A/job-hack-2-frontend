import Hero from "../components/Hero/Hero";
import { AiOutlineSearch } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import React, { useState } from "react";
import Checkbox from "../components/Checkbox/Checkbox";
import useAdzuna from "../hooks/useAdzuna";

type workLocationType = "office" | "remote" | "hybrid" | undefined;
const Home = () => {
  const useJobs = useAdzuna();

  const [job, setJob] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [workLocation, setWorkLocation] = useState<workLocationType>();

  const [freelance, setFreelance] = useState<boolean>(false);
  const [fullTime, setFullTime] = useState<boolean>(false);
  const [partTime, setPartTime] = useState<boolean>(false);
  const [graduate, setGraduate] = useState<boolean>(false);
  const [internship, setInternship] = useState<boolean>(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(job, location, workLocation);
  };

  const renderOptions = () => {
    const options = [
      { name: "Freelance", state: freelance, setState: setFreelance },
      { name: "Full-Time", state: fullTime, setState: setFullTime },
      { name: "Part-Time", state: partTime, setState: setPartTime },
      { name: "Graduate", state: graduate, setState: setGraduate },
      { name: "Internship", state: internship, setState: setInternship },
    ];

    return (
      <div className="space-x-4 flex my-3 items-center">
        {options.map((el, index) => {
          return (
            <Checkbox
              name={el.name}
              key={index}
              isChecked={el.state}
              setIsChecked={el.setState}
            />
          );
        })}
      </div>
    );
  };

  const renderForm = () => {
    return (
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
    );
  };

  const renderJobCards = () => {
    const { isLoading } = useJobs;
    console.log(useJobs);
    return (
      <div className="space-y-4 border-t pt-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          useJobs.jobs!.map((el, index) => {
            return (
              <div
                key={index}
                className="border flex justify-between hover:cursor-pointer hover:shadow px-3 py-2"
              >
                <div className="flex flex-col justify-center">
                  <h5 className="text-2xl tracking-tight text-gray-900">
                    {el.title}
                  </h5>
                  <p className="opacity-50 text-lg">{el.company.display_name}</p>
                </div>
                <div className="flex flex-col text-right">
                  <h6 className="font-bold tracking-wide text-blue-900">
                    {el.location.display_name}
                  </h6>
                  <p>£{el.salary_max}</p>
                  <p className="text-green-500 font-bold uppercase text-sm">
                    {el.contract_type.replace("_", "-")}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  };

  return (
    <div>
      <Hero />
      <BGWrapper>
        <ForegroundWrapper>
          {renderForm()}
          {renderOptions()}
          {renderJobCards()}
        </ForegroundWrapper>
      </BGWrapper>
    </div>
  );
};

const BGWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-gray-50 relative h-screen">
      {children}
    </div>
  );
};

const ForegroundWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="w-4/5 mx-auto bg-white p-4 shadow-lg rounded absolute -top-10 left-0 right-0">
      {children}
    </div>
  );
};

export default Home;
