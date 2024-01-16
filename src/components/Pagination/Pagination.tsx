import { PageContext } from "context/PageContext";
import React, { useContext, useEffect, useState } from "react";

const PaginationLeftRightButton = ({
  text,
  buttonHanlder,
  isDisabled = false,
}) => {
  return (
    <div
      className="bg-primary cursor-pointer  px-4 py-2 "
      onClick={() => (!isDisabled ? buttonHanlder() : null)}
    >
      <p className="text-white"> {text} </p>
    </div>
  );
};

const Pagination = ({ pages, totalCount, totalItemsCount }) => {
  const { currentPage, setCurrentPage, pageRange, setPageRange } =
    useContext(PageContext);

  if (pageRange == 0) {
    return;
  }

  const handleNext = () => {
    if (currentPage >= pages) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage <= 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };
  const handleSelectOption = (e) => {
    const page = +e.target.value;
    console.log(e.target.value);
    setCurrentPage(page);
  };

  return (
    <div className="flex my-3 items-center gap-2 flex-wrap max-sm:justify-center ">
      <PaginationLeftRightButton
        text="<"
        isDisabled={false}
        buttonHanlder={handlePrevious}
      />

      <select
        className="text-center p-2 mx-2 custom-scrollbar focus:border-2 focus:border-primary outline-none"
        onChange={handleSelectOption}
        value={currentPage}
      >
        {(() => {
          const a = [...Array(pages)].map((x, i) => {
            return (
              <option key={i} value={i + 1} className="  text-center">
                {i + 1}
              </option>
            );
          });

          return a;
        })()}
      </select>

      <PaginationLeftRightButton
        text=">"
        isDisabled={false}
        buttonHanlder={handleNext}
      />
      <div className='flex items-center gap-2'>
        <span className="inline-block">
          <p className="text-gray font-semibold text-md">Page {currentPage} </p>
        </span>

        <span className="inline-block italic">
          <p className="text-gray font-semibold text-sm">
            {pageRange} of {totalCount}
          </p>
        </span>
      </div>
    </div>
  );
};

export default Pagination;
