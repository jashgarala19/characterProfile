import CharacterCard from "components/CharacterCard/CharacterCard";
import Input from "components/Input/Input";
import Pagination from "components/Pagination/Pagination";
import { SearchCharacterContext } from "context/SearchCharacterContext";
import { useContext } from "react";
const searchTypes = [
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
const SearchTypeCard = ({ handleClick, text, isActive }) => {
  return (
    <div
      className={`   cursor-pointer flex items-center px-2  max-sm:flex-1   ${
        isActive ? "bg-primary border border-primary  " : " bg-darkGray"
      }`}
      onClick={handleClick}
    >
      <p className="text-white">{text}</p>
    </div>
  );
};
const HomeListContainer = ({ data, error, loading }) => {
  const { searchValue, searchType, setSearchValue, setSearchType } = useContext(
    SearchCharacterContext
  );

  return (
    <div className="flex  flex-col  flex-1 ">
      <div className="flex max-sm:flex-wrap ">
        <div className="flex  max-sm:flex-1 ">
          {searchTypes.map(({ text, value }) => {
            return (
              <SearchTypeCard
                text={text}
                handleClick={() => setSearchType(value)}
                isActive={value === searchType}
              />
            );
          })}
        </div>
        <Input
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={`Search by ${searchType}`}
          name="searchBar"
          value={searchValue}
        />
      </div>
      <Pagination
        pages={data?.info?.pages}
        totalCount={data?.info?.count}
        totalItemsCount={data?.results?.length}
      />

      <div className="flex flex-row justify-start gap-4  flex-wrap my-6 max-sm:flex-col max-sm:flex-nowrap  max-sm:justify-center ">
        {error ? (
          <div className="w-ful min-h-[calc(100vh_-_220px)] flex flex-1 justify-center items-center ">
            <h2 className="text-primary text-4xl">{error}!!</h2>
          </div>
        ) : loading ? (
          <div className="w-ful min-h-[calc(100vh_-_220px)] flex flex-1 justify-center items-center ">
            <h2 className="text-primary text-4xl">Loading...</h2>
          </div>
        ) : (
          data?.results?.map((item) => {
            return <CharacterCard character={item} />;
          })
        )}
      </div>
    </div>
  );
};

export default HomeListContainer;
