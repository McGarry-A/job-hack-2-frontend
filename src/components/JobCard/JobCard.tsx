import { Draggable } from "react-beautiful-dnd";
import { RiExternalLinkLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

interface props {
  job: {
    id: string;
    title: string;
    company: string;
    link: string;
  };
  index: number;
}

const JobCard = ({ job, index }: props) => {
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
            <p>{job.company}</p>
            <NavLink
              to={`/job-profile/${job.id}`}
              className="text-xs text-sky-400 underline"
            >
              See Job Description
            </NavLink>
          </div>
          <div className="ml-1">
            <a href={job.link}>
              <RiExternalLinkLine />
            </a>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default JobCard;
