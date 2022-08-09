import { Draggable } from "react-beautiful-dnd";

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
          className="bg-gray-50 w-64 py-2 px-1 rounded shadow cursor-grabbing"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {job.title}
        </div>
      )}
    </Draggable>
  );
};

export default JobCard;
