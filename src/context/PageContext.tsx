import { createContext, useState } from "react";

export const PageContext = createContext();

const CurrentPageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState("");
  return (
    <PageContext.Provider
      value={{
        currentPage,setCurrentPage,pageRange,setPageRange
      }}
    >
      {children}
    </PageContext.Provider>
  );
};

export default CurrentPageProvider;
