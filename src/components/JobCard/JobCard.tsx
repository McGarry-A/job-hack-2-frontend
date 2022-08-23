import { Draggable } from "react-beautiful-dnd";
import { AiOutlineClose } from "react-icons/ai";
import { RiExternalLinkLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { removeJob } from "../../store/savedJobsSlice";

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
  const dispatch = useAppDispatch();

  const handleDeleteCard = ({ id, columnId }: DeleteProps) => {
    dispatch(removeJob({ id: job.id, columnId: columnId }));
  };

  return (
    <Draggable draggableId={job.id} index={index}>
      {(provided) => (
        <div
          className="bg-gray-50 w-64 py-2 px-2 rounded shadow cursor-grabbing flex justify-between"
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
