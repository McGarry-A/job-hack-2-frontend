import { Dispatch, SetStateAction } from "react";

interface Props {
  name: string;
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
}

const Checkbox: React.FC<Props> = ({ name, isChecked, setIsChecked }) => {
  return (
    <div
      className={`flex items-center border py-2 px-4 rounded-3xl text-sm lg:text-base ${
        isChecked ? "bg-blue-400" : "bg-blue-300"
      } cursor-pointer hover:bg-blue-400`}
      onClick={() => setIsChecked(!isChecked)}
    >
      <input
        type="checkbox"
        checked={isChecked}
        className=""
        onChange={() => null}
      />
      <p
        className={`ml-2 mt-1 ${isChecked ? "text-blue-200" : "text-gray-50"}`}
      >
        {name}
      </p>
    </div>
  );
};

export default Checkbox;
