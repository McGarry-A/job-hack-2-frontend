import Navbar from "../components/Layout/Navbar/Navbar";
import { motion } from "framer-motion";
import RouteVar from "../animations/Route";
import Breadcrumbs from "../components/Layout/Breadcrumbs/Breadcrumbs";
import PageTitle from "../components/Layout/PageTitle/PageTitle";
import Column from "../components/Column/Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import CreateColumn from "../components/CreateColumn/CreateColumn";
import { useAppDispatch, useAppSelector } from "../store";
import { setJobs } from "../store/savedJobsSlice";

// import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

const MyJobs = () => {
  const savedJobs = useAppSelector((state) => state.jobs);
  const dispatch = useAppDispatch();

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = savedJobs.columns[source.droppableId];
    const finish = savedJobs.columns[destination.droppableId];

    // REORDER IN SAME COLUMN
    if (start === finish) {
      const newJobIds = Array.from(start.jobIds);

      newJobIds.splice(source.index, 1);
      newJobIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        jobIds: newJobIds,
      };

      const newState = {
        ...savedJobs,
        columns: {
          ...savedJobs.columns,
          [newColumn.id]: newColumn,
        },
      };

      dispatch(setJobs(newState));
      return;
    }

    //REORDER ACCROSS COLUMNS
    const startJobIds = Array.from(start.jobIds);
    startJobIds.splice(source.index, 1);
    const newStart = {
      ...start,
      jobIds: startJobIds,
    };

    const finishJobIds = Array.from(finish.jobIds);
    finishJobIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      jobIds: finishJobIds,
    };

    const newState = {
      ...savedJobs,
      columns: {
        ...savedJobs.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    dispatch(setJobs(newState));
  };

  const breadcrumbs = [
    { title: "Home", link: "/" },
    { title: "My Jobs", link: "/my-jobs" },
  ];

  const renderColumns = () => {
    if (savedJobs.columnOrder.length >= 1) {
      return (
        <div className="flex max-w-6xl w-full mx-auto bg-white rounded mb-24 p-4 flex-wrap justify-center">
          {savedJobs.columnOrder.map((columnId, index) => {
            const column = savedJobs.columns[columnId];
            const jobs = column.jobIds.map((jobIds) => savedJobs.jobs[jobIds]);

            return <Column key={column.id} column={column} jobs={jobs} />;
          })}
          <CreateColumn />
        </div>
      );
    }

      return <CreateColumn />;
  };

  return (
    <div>
      <Navbar />
      <motion.div
        variants={RouteVar}
        initial="hidden"
        animate="show"
        exit={{ opacity: 0 }}
      >
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <PageTitle title="My Jobs" />
        <DragDropContext onDragEnd={handleDragEnd}>
            {renderColumns()}
        </DragDropContext>
      </motion.div>
    </div>
  );
};

export default MyJobs;
