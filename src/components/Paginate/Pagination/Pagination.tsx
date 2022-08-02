import { Dispatch, SetStateAction } from "react";

interface props {
  setPagination: Dispatch<SetStateAction<number>>;
  pagination: number;
}

const Pagination = ({ setPagination, pagination }: props) => {
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="flex mx-auto justify-center space-x-5 text-sm mt-5 text-gray-900">
      <button
        onClick={() => setPagination(pagination - 1)}
        className="hover:text-sky-500"
      >
        {" "}
        {"<"}{" "}
      </button>
      {pages.map((el, index) => {
        return (
          <button
            key={index}
            onClick={() => setPagination(el as number)}
            className={`w-4 ${
              pagination === el ? "text-sky-500 border-b-2 border-sky-500" : ""
            } hover:text-sky-500`}
          >
            {el}
          </button>
        );
      })}
      <button
        onClick={() => setPagination(pagination + 1)}
        className="hover:text-sky-500"
      >
        {" "}
        {">"}{" "}
      </button>
    </div>
  );
};

export default Pagination;
