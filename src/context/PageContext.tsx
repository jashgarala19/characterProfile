import  { createContext, useState, ReactNode } from "react";

export interface PageContextProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageRange: string;
  setPageRange: React.Dispatch<React.SetStateAction<string>>;
}

export const PageContext = createContext<PageContextProps | undefined>(undefined);

interface CurrentPageProviderProps {
  children: ReactNode;
}

const CurrentPageProvider: React.FC<CurrentPageProviderProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageRange, setPageRange] = useState<string>("");

  const contextValue: PageContextProps = {
    currentPage,
    setCurrentPage,
    pageRange,
    setPageRange,
  };

  return (
    <PageContext.Provider value={contextValue}>
      {children}
    </PageContext.Provider>
  );
};

export default CurrentPageProvider;
