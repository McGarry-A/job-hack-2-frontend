import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import useUniqueId from "../../hooks/useUniqueId";
import { useAppDispatch } from "../../store";
import { createColumn } from "../../store/savedJobsSlice";

const CreateColumn = () => {
  const [active, setActive] = useState<boolean>(false);
  const [newColumn, setNewColumn] = useState<string>("");

  const dispatch = useAppDispatch();
  const newColId = useUniqueId();

  const handleCreateColumn = async () => {
    dispatch(createColumn({ title: newColumn, id: newColId }));
    setActive(false);
  };

  const renderContent = () => {
    if (active) {
      return (
        <div className="w-full h-9 bg-white flex justify-between p-2">
          <input
            placeholder="Column Title"
            className="focus:outline-none flex-1 flex-grow"
            onChange={(e) => setNewColumn(e.target.value)}
          />
          <button onClick={handleCreateColumn}>
            <AiOutlinePlus />
          </button>
        </div>
      );
    }

    return (
      <button onClick={() => setActive(true)}>
        <h5 className="text-sm mb-2 text-left text-gray-500">
          Create A New Column
        </h5>
      </button>
    );
  };

  return (
    <div className="bg-gray-50 p-3 rounded max-w-xs w-full m-2 flex flex-col flex-grow h-52">
      {renderContent()}
    </div>
  );
};

export default CreateColumn;
