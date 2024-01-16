import React from "react";
import CharacterCard, { CharacterCardProps } from "components/CharacterCard/CharacterCard";
import Input from "components/Input/Input";
import Pagination from "components/Pagination/Pagination";
import {
  SearchCharacterContext,
  SearchCharacterContextProps,
} from "context/SearchCharacterContext";
import { useContext } from "react";

interface SearchType {
  text: string;
  value: string;
}

interface SearchTypeCardProps {
  handleClick: () => void;
  text: string;
  isActive: boolean;
}

const searchTypes: SearchType[] = [
  {
    text: "Name",
    value: "name",
  },
  {
    text: "Species",
    value: "species",
  },
  {
    text: "Type",
    value: "type",
  },
];

const SearchTypeCard: React.FC<SearchTypeCardProps> = ({
  handleClick,
  text,
  isActive,
}) => {
  return (
    <div
      className={`cursor-pointer flex items-center px-2 max-sm:flex-1 ${
        isActive ? "bg-primary border border-primary" : "bg-darkGray"
      }`}
      onClick={handleClick}
    >
      <p className="text-white">{text}</p>
    </div>
  );
};

interface HomeListContainerProps {
  data: {
    info: {
      pages: number;
      count: number;
    };
    results: CharacterCardProps["character"][]; // Update the type according to your character data
  } | null;
  error: string | null;
  loading: boolean;
}

const HomeListContainer: React.FC<HomeListContainerProps> = ({
  data,
  error,
  loading,
}) => {
  const { searchValue, searchType, setSearchValue, setSearchType } = useContext(
    SearchCharacterContext
  ) as SearchCharacterContextProps;

  return (
    <div className="flex flex-col flex-1">
      <div className="flex max-sm:flex-wrap">
        <div className="flex max-sm:flex-1">
          {searchTypes.map(({ text, value }) => (
            <SearchTypeCard
              key={value}
              text={text}
              handleClick={() => setSearchType(value)}
              isActive={value === searchType}
            />
          ))}
        </div>
        <Input
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={`Search by ${searchType}`}
          name="searchBar"
          value={searchValue}
        />
      </div>
      <Pagination
        pages={data?.info?.pages || 0}
        totalCount={data?.info?.count || 0}
        totalItemsCount={data?.results?.length || 0}
      />

      <div className="flex flex-row justify-start gap-4 flex-wrap my-6 max-sm:flex-col max-sm:flex-nowrap max-sm:justify-center">
        {error ? (
          <div className="w-full min-h-[calc(100vh_-_220px)] flex flex-1 justify-center items-center">
            <h2 className="text-primary text-4xl">{error}!!</h2>
          </div>
        ) : loading ? (
          <div className="w-full min-h-[calc(100vh_-_220px)] flex flex-1 justify-center items-center">
            <h2 className="text-primary text-4xl">Loading...</h2>
          </div>
        ) : (
          data?.results?.map((item,index) => (
            <CharacterCard key={index} character={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default HomeListContainer;
