import { Droppable } from "react-beautiful-dnd";
import { BsX } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../store";
import JobCard from "../JobCard/JobCard";
import { removeColumn as getNewState } from "../../utils/ManageJobsTable/removeColumn";
import updateJobs from "../../utils/updateJobs";
import { setJobs } from "../../store/savedJobsSlice";

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
  const state = useAppSelector((state) => state);

  const handleDeleteColumn = async (newColId: string) => {
    const { jobs } = state;

    const newState = getNewState(jobs, { id: newColId });
    const updatedDB = await updateJobs({
      newJobsState: newState,
      email: state.user.user.email,
    });

    if (updatedDB) dispatch(setJobs(newState));
  };

  return (
    <div className="bg-gray-50 p-3 rounded max-w-xs w-full m-2 flex flex-col min-h-52">
      <div className="flex justify-between items-center mb-2">
        <h5 className="text-lg font-semibold text-slate-600">{column.title}</h5>
        <button className="mb-2">
          <BsX
            className="text-lg"
            onClick={() => handleDeleteColumn(column.id)}
          />
        </button>
      </div>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            className={`space-y-4 flex flex-grow flex-col`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {jobs.map((job, index) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  index={index}
                  columnId={column.id}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
