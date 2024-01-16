import { createContext, useState, ReactNode } from "react";

export interface SearchCharacterContextProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchType: string;
  setSearchType: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchCharacterContext = createContext<SearchCharacterContextProps | undefined>(undefined);

interface SearchCharactersProviderProps {
  children: ReactNode;
}

const SearchCharactersProvider: React.FC<SearchCharactersProviderProps> = ({ children }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("name");

  const contextValue: SearchCharacterContextProps = {
    searchValue,
    setSearchValue,
    searchType,
    setSearchType,
  };

  return (
    <SearchCharacterContext.Provider value={contextValue}>
      {children}
    </SearchCharacterContext.Provider>
  );
};

export default SearchCharactersProvider;
