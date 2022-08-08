import Navbar from "../components/Layout/Navbar/Navbar";
import { motion } from "framer-motion";
import RouteVar from "../animations/Route";
import Breadcrumbs from "../components/Layout/Breadcrumbs/Breadcrumbs";
import PageTitle from "../components/Layout/PageTitle/PageTitle";
import JobCard from "../components/JobCard/JobCard";
import { useState } from "react";
import Column from "../components/Column/Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

// import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

interface TableInterface {
  jobs: {
    [key: string]: {
      id: string;
      content: string;
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

interface ResultInterface {
  draggableId: string;
  type: string;
  reason: string;
  source: {
    droppableId: string;
    index: number;
  };
  destination: {
    droppableId: string;
    index: number;
  } | null;
}

const initialData: TableInterface = {
  jobs: {
    "job-1": {
      id: "job-1",
      content: "CleanCloud",
    },
    "job-2": {
      id: "job-2",
      content: "JD",
    },
    "job-3": {
      id: "job-3",
      content: "BeautyWorks",
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Saved Jobs",
      jobIds: ["job-1", "job-2", "job-3"],
    },
    "column-2": {
      id: "column-2",
      title: "Applied",
      jobIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Interview",
      jobIds: [],
    },
    "column-4": {
      id: "column-4",
      title: "Accepted",
      jobIds: [],
    },
    "column-5": {
      id: "column-5",
      title: "Rejected",
      jobIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3", "column-4", "column-5"],
};

const MyJobs = () => {
  const [table, setTable] = useState<TableInterface>(initialData);

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
          <div className="flex max-w-6xl w-full mx-auto bg-white rounded mb-24 p-4 flex-wrap">
            {initialData.columnOrder.map((columnId, index) => {
              const column = table.columns[columnId];
              const jobs = column.jobIds.map((jobIds) => table.jobs[jobIds]);

              return <Column key={column.id} column={column} jobs={jobs} />;
            })}
          </div>
        </DragDropContext>
      </motion.div>
    </div>
  );
};

export default MyJobs;
