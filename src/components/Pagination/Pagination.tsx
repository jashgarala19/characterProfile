import { useContext, ChangeEvent } from "react";
import { PageContext, PageContextProps } from "context/PageContext";

interface PaginationLeftRightButtonProps {
  text: string;
  buttonHandler: () => void;
  isDisabled?: boolean;
}

const PaginationLeftRightButton: React.FC<PaginationLeftRightButtonProps> = ({
  text,
  buttonHandler,
  isDisabled = false,
}) => {
  return (
    <div
      className="bg-primary cursor-pointer px-4 py-2"
      onClick={() => (!isDisabled ? buttonHandler() : null)}
    >
      <p className="text-white"> {text} </p>
    </div>
  );
};

interface PaginationProps {
  pages: number;
  totalCount: number;
  totalItemsCount: number;
}

const Pagination: React.FC<PaginationProps> = ({ pages, totalCount }) => {
  const { currentPage, setCurrentPage, pageRange } = useContext(
    PageContext
  ) as PageContextProps;

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

  const handleSelectOption = (e: ChangeEvent<HTMLSelectElement>) => {
    const page = +e.target.value;
    setCurrentPage(page);
  };

  return (
    <div className="flex my-3 items-center gap-2 flex-wrap max-sm:justify-center ">
      <PaginationLeftRightButton
        text="<"
        isDisabled={false}
        buttonHandler={handlePrevious}
      />

      <select
        className="text-center p-2 mx-2 custom-scrollbar focus:border-2 focus:border-primary outline-none"
        onChange={handleSelectOption}
        value={currentPage}
      >
        {Array.from({ length: pages }, (_, i) => (
          <option key={i} value={i + 1} className="text-center">
            {i + 1}
          </option>
        ))}
      </select>

      <PaginationLeftRightButton
        text=">"
        isDisabled={false}
        buttonHandler={handleNext}
      />
      <div className="flex items-center gap-2">
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
