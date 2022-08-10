import { Droppable } from "react-beautiful-dnd";
import { BsX } from "react-icons/bs";
import { useAppDispatch } from "../../store";
import { removeColumn } from "../../store/savedJobsSlice";
import JobCard from "../JobCard/JobCard";

interface props {
  column: {
    id: string;
    title: string;
    jobIds: string[];
  };
  jobs: {
    id: string;
    title: string;
    company: string;
    link: string;
  }[];
}

const Column = ({ column, jobs }: props) => {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-gray-50 p-3 rounded max-w-xs w-full m-2 flex flex-col h-52">
      <div className="flex justify-between items-center mb-2">
        <h5 className="text-lg font-semibold ">{column.title}</h5>
        <button className="mb-2">
          <BsX className="text-lg" onClick={() => dispatch(removeColumn({ id: column.id }))} />
        </button>
      </div>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            className={`space-y-2`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {jobs.map((job, index) => {
              return <JobCard key={job.id} job={job} index={index} />;
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
