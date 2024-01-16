import { createContext, useState } from "react";

export const SearchCharacterContext = createContext();

const SearchCharactersProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("name");
  return (
    <SearchCharacterContext.Provider
      value={{
        searchValue,
        setSearchValue,
        searchType,
        setSearchType,
      }}
    >
      {children}
    </SearchCharacterContext.Provider>
  );
};

export default SearchCharactersProvider;
