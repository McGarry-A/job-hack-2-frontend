import { GrFormNext } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

const MyJobs = () => {
  const renderBreadcrumbs = () => {
    return (
      <div className="flex space-x-2 items-center justify-center my-12">
        <NavLink
          to="/"
          className="opacity-50 text-xs uppercase tracking-widest mt-1"
        >
          Home
        </NavLink>
        <GrFormNext size={"1.3rem"} className="opacity-50" />
        <NavLink
          to="/my-jobs"
          className="text-xs uppercase tracking-widest mt-1"
        >
          My Jobs
        </NavLink>
      </div>
    );
  };

  const renderHeader = () => (
    <div className="my-10 mx-auto text-center">
      <h2 className="text-5xl font-semibold">My Jobs</h2>
    </div>
  );

  // type droppableType = { title: string; id: string };

  // const rows = [
  //   {
  //     title: "Liked",
  //     id: "1",
  //   },
  //   {
  //     title: "Applied",
  //     id: "2",
  //   },
  //   {
  //     title: "Interviewed",
  //     id: "3",
  //   },
  // ];

  // const renderRow = (props: droppableType) => {
  //   const placeHolderCards = ["", "", "", "", ""];
  //   return (
  //     <div className="my-5">
  //       <div>
  //         <h3 className="text-2xl">{props.title}</h3>
  //       </div>
  //       <Droppable droppableId={props.id}>
  //         {(provided) => (
  //           <div
  //             className="flex space-x-8 overflow-x-scroll"
  //             innerRef={provided.innerRef}
  //             {...provided.droppableProps}
  //           >
  //             {placeHolderCards.map((el, index) => (
  //               <div
  //                 className="bg-gray-200 cursor-grabbing min-w-md w-full h-[250px] draggable"
  //                 key={index}
  //               ></div>
  //             ))}
  //           </div>
  //         )}
  //       </Droppable>
  //     </div>
  //   );
  // };

  // const onDragEnd = (result: DropResult) => {};

  return (
    <div>
      <Navbar />
      {renderBreadcrumbs()}
      {renderHeader()}
      {/* <DragDropContext onDragEnd={onDragEnd}>
        {rows.map(renderRow)}
      </DragDropContext> */}
    </div>
  );
};

export default MyJobs;
