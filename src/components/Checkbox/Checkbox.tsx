import { Dispatch, SetStateAction } from "react";

interface Props {
  name: string;
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
}

const Checkbox: React.FC<Props> = ({ name, isChecked, setIsChecked }) => {
  return (
    <div
      className={`flex items-center border py-2 px-4 rounded ${
        isChecked ? "bg-blue-400" : "bg-blue-300"
      } cursor-pointer`}
      onClick={() => setIsChecked(!isChecked)}
    >
      <input type="checkbox" checked={isChecked} className="" />
      <p className="ml-2 mt-1 text-gray-50">{name}</p>
    </div>
  );
};

export default Checkbox;
