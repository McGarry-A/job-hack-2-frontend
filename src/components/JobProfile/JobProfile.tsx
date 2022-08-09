import { ReedJobProfile } from "../../types/ReedJobsTypes";
import Loader from "../Loader/Loader";
import { useAppDispatch, useAppSelector } from "../../store";
import { setNotification } from "../../store/notificationSlice";
import HTMLParser from "../HTMLParser/HTMLParser";
import { TiBusinessCard } from "react-icons/ti";
import { AiOutlineEnter } from "react-icons/ai";
// import { addToLikedJobs } from "../../store/userSlice";

interface props {
  profile: ReedJobProfile | undefined;
  error: any;
  isLoading: boolean;
}

const JobProfile = ({ profile, error, isLoading }: props) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.user);

  const handleAddToList = () => {
    if (!profile) return;
    if (!state.isLoggedIn) {
      dispatch(
        setNotification({
          state: false,
          status: "error",
          message:
            "Please ensure that you are logged in before adding items to your wishlist.",
        })
      );

      return;
    }

    dispatch(
      setNotification({
        state: false,
        status: "success",
        message:
          "Successfully added to your list. You can now manage this in the My Jobs tab.",
      })
    );

    const jobToAdd = {
      title: profile.jobTitle,
      company: profile.employerName,
      salary: profile.maximumSalary as number,
      location: profile.locationName,
      description: profile.jobDescription,
    };

    // dispatch(addToLikedJobs(jobToAdd));
  };

  if (isLoading) return <Loader />;

  if (error) {
    dispatch(
      setNotification({
        state: false,
        status: "error",
        message:
          "There was an error rending your cards, please reload the page.",
      })
    );
    return <div>There was an error rendering your cards</div>;
  }

  if (profile === undefined) {
    return <div>No results returned for this jobID</div>;
  }

  return (
    <>
      <a
        href={profile.externalUrl}
        className="text-sky-400 cursor-pointer hover:underline w-max"
      >
        View company profile
      </a>
      <div>
        <h2 className="text-4xl tracking-tight font-semibold text-gray-700">
          {profile.employerName} is hiring a {profile.jobTitle}
        </h2>
        <div className="border-b-4 w-12 border-sky-500 mt-4"></div>
      </div>
      <div className="text-right text-sm opacity-60 space-y-1">
        <p>Date posted: {profile.datePosted}</p>
        <p>Expires on: {profile.expirationDate}</p>
        <p>{profile.applicationCount} Applicants</p>
      </div>
      <HTMLParser html={profile.jobDescription} />
      <div className="flex space-x-4 pt-10">
        <button
          className="text-white px-6 py-3 bg-sky-400 rounded flex items-center justify-center border-2 border-sky-400"
          onClick={() => handleAddToList()}
        >
          <TiBusinessCard className="mr-2 text-lg" />
          Add to List
        </button>
        <a href={profile.jobUrl} target="_blank" rel="noopener noreferrer">
          <button className="bg-white px-6 py-3 text-sky-400 rounded flex items-center justify-center border-sky-400 border-2">
            <AiOutlineEnter className="mr-2 text-lg" />
            Apply for role
          </button>
        </a>
      </div>
    </>
  );
};

export default JobProfile;
