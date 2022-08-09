import { Droppable } from "react-beautiful-dnd";
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
  return (
    <div className="bg-gray-50 p-3 rounded max-w-xs w-full m-2 flex flex-col h-52">
      <h5 className="text-lg font-semibold mb-2">{column.title}</h5>
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
