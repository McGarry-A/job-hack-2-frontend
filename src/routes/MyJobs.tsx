import Navbar from "../components/Navbar/Navbar";
import { motion } from "framer-motion";
import RouteVar from "../Animations/Route";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

// import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

const MyJobs = () => {
  const breadcrumbs = [
    { title: "Home", link: "/" },
    { title: "My Jobs", link: "/my-jobs" },
  ];

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
      <motion.div
        variants={RouteVar}
        initial="hidden"
        animate="show"
        exit={{ opacity: 0 }}
      >
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {renderHeader()}
      </motion.div>
    </div>
  );
};

export default MyJobs;
