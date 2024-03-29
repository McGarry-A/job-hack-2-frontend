import { Draggable } from "react-beautiful-dnd";
import { AiOutlineClose } from "react-icons/ai";
import { RiExternalLinkLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import updateJobs from "../../utils/updateJobs";
import { removeJob as getNewState } from "../../utils/ManageJobsTable/removeJob";
import { setJobs } from "../../store/savedJobsSlice";
import { useToast } from "@chakra-ui/react";

interface props {
  job: {
    id: string;
    title: string;
    company: string;
    link: string;
  };
  index: number;
  columnId: string;
}

interface DeleteProps {
  id: string;
  columnId: string;
}

const JobCard = ({ job, index, columnId }: props) => {
  const toast = useToast()
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);

  const handleDeleteCard = async ({ id, columnId }: DeleteProps) => {
    const payload = { id, columnId };
    const newState = getNewState(state.jobs, payload);
    
    dispatch(setJobs(newState));
    
    const updatedDB = await updateJobs({
      newJobsState: newState,
      email: state.user.user.email,
    });

    if (!updatedDB) {
      toast({
        status: "error",
        description: "There was an error updating your cards",
        position: "bottom",
        duration: 5000
      })
    }
  };

  return (
    <Draggable draggableId={job.id} index={index}>
      {(provided) => (
        <div
          className="w-72 py-2 px-2 rounded shadow cursor-grabbing flex justify-between bg-white"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div>
            <h6>{job.title}</h6>
            <p className="opacity-50 mt-1 text-sm italic">{job.company}</p>
            <NavLink
              to={`/job-profile/${job.id}`}
              className="text-xs text-sky-400 underline"
            >
              See Job Description
            </NavLink>
          </div>
          <div className="flex flex-col justify-between ml-2 opacity-50">
            <div className="cursor-pointer">
              <AiOutlineClose
                onClick={() =>
                  handleDeleteCard({ id: job.id, columnId: columnId })
                }
              />
            </div>
            <div className="cursor-pointer">
              <a href={job.link}>
                <RiExternalLinkLine />
              </a>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default JobCard;
