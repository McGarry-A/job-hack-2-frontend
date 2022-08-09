import Navbar from "../components/Layout/Navbar/Navbar";
import { motion } from "framer-motion";
import RouteVar from "../animations/Route";
import Breadcrumbs from "../components/Layout/Breadcrumbs/Breadcrumbs";
import PageTitle from "../components/Layout/PageTitle/PageTitle";
import { useState } from "react";
import Column from "../components/Column/Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import CreateColumn from "../components/CreateColumn/CreateColumn";
import { useAppSelector } from "../store";

// import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

interface TableInterface {
  jobs: {
    [key: string]: {
      id: string;
      company: string;
      title: string;
      link: string;
    };
  };
  columns: {
    [key: string]: {
      id: string;
      title: string;
      jobIds: string[];
    };
  };
  columnOrder: string[];
}

const MyJobs = () => {
  const state = useAppSelector((state) => state.user.savedJobs);
  const [table, setTable] = useState<TableInterface>({ ...state });

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = table.columns[source.droppableId];
    const finish = table.columns[destination.droppableId];

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
        ...table,
        columns: {
          ...table.columns,
          [newColumn.id]: newColumn,
        },
      };

      setTable(newState);
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
      ...table,
      columns: {
        ...table.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setTable(newState);
  };

  const breadcrumbs = [
    { title: "Home", link: "/" },
    { title: "My Jobs", link: "/my-jobs" },
  ];

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
          {table.columnOrder && (
            <div className="flex max-w-6xl w-full mx-auto bg-white rounded mb-24 p-4 flex-wrap justify-center">
              {table.columnOrder.map((columnId, index) => {
                const column = table.columns[columnId];
                const jobs = column.jobIds.map((jobIds) => table.jobs[jobIds]);

                return <Column key={column.id} column={column} jobs={jobs} />;
              })}
              <CreateColumn />
            </div>
          )}
        </DragDropContext>
      </motion.div>
    </div>
  );
};

export default MyJobs;
