import React, { Dispatch, SetStateAction } from "react";
import Pagination from "../Pagination/Pagination";

interface props {
  children: React.ReactNode;
  pagination: number;
  setPagination: Dispatch<SetStateAction<number>>;
}

const PaginationWrapper: React.FC<props> = (props) => {
  const paginationProps = {
    pagination: props.pagination,
    setPagination: props.setPagination,
  };

  return (
    <div className="">
      {props.children}
      <Pagination {...paginationProps} />
    </div>
  );
};

export default PaginationWrapper;
