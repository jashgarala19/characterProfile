import HomeFilterContainer from "containers/home/HomeFilterContainer/HomeFilterContainer";
import HomeListContainer from "containers/home/HomeListContainer/HomeListContainer";
import { PageContext, PageContextProps } from "context/PageContext";
import {
  SearchCharacterContext,
  SearchCharacterContextProps,
} from "context/SearchCharacterContext";
import useApiData, { ApiResponse } from "hooks/useApiData";
import { createFilterState } from "hooks/useFilter";
import { useContext, useEffect, useState } from "react";
import FilterImage from "assets/filter.png";
import CloseImage from "assets/close.png";
import Accordion from "components/Accordion/Accordion";
import FilterOptions from "components/FilterOptions/FilterOptions";
import { useNavigate } from "react-router-dom";
interface Filter {
  filterTitle: string;
  filterOptions: string[];
  selectedFilterValues: string | string[];
  isMultiSelect: boolean;
  filterHander?: (
    e: React.MouseEvent<HTMLDivElement>,
    selectedValues: string[] | string
  ) => void;
}

const HomePage = () => {
  const { data, loading, error, refetch }: ApiResponse =
    useApiData("character");
  const genderFilter: Filter = createFilterState({
    filterTitle: "Gender",
    filterOptions: ["male", "female", "genderless", "unknown"],
    initialValue: "",
    isMultiSelect: false,
  });

  const statusFilter = createFilterState({
    filterTitle: "Status",
    filterOptions: ["alive", "dead", "unknown"],
    initialValue: "",
    isMultiSelect: false,
  });

  const { searchValue, searchType } = useContext(
    SearchCharacterContext
  ) as SearchCharacterContextProps;
  const { currentPage, setCurrentPage, setPageRange } = useContext(
    PageContext
  ) as PageContextProps;
  useEffect(() => {
    setCurrentPage(1);
  }, [
    genderFilter.selectedFilterValues,
    statusFilter?.selectedFilterValues,
    searchValue,
    setCurrentPage,
  ]);
  useEffect(() => {
    let status = statusFilter.selectedFilterValues;
    let gender = genderFilter.selectedFilterValues;

    if (!statusFilter?.selectedFilterValues) status = "";
    if (!genderFilter?.selectedFilterValues) gender = "";
    let filterValue = searchValue;
    if (!searchValue) filterValue = "";
    refetch({
      gender,
      status,
      [searchType]: filterValue,
      page: currentPage,
    });
  }, [
    genderFilter.selectedFilterValues,
    statusFilter?.selectedFilterValues,
    searchValue,
    currentPage,
    setCurrentPage,
    refetch,
    searchType,
  ]);

  useEffect(() => {
    if (!error && !loading) {
      const resultsLength = data?.results?.length || 0;

      if (resultsLength === 1) {
        setPageRange("1");
      } else if (resultsLength > 0) {
        const startRange = (currentPage - 1) * 20 + 1;
        const endRange =
          resultsLength < 20
            ? resultsLength + (currentPage - 1) * 20
            : currentPage * 20;

        setPageRange(`${startRange} - ${endRange}`);
      } else {
        setPageRange("0");
      }
    } else {
      setPageRange("0");
    }
  }, [
    genderFilter.selectedFilterValues,
    statusFilter?.selectedFilterValues,
    searchValue,
    currentPage,
    loading,
    data,
    error,
    setPageRange,
  ]);

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };
  const navigate = useNavigate();
  const handleCharacterClick = (id: string | number) => {
    navigate(`/character/${id}`, {
      state: id,
    });
  };
  return (
    <>
      <div className="p-5 relative  ">
        <div className=" mx-auto max-w-[80rem]   min-h-[calc(100vh_-_110px)] ">
          <div className="flex gap-3 flex-row ">
            <HomeFilterContainer filters={[genderFilter, statusFilter]} />
            <HomeListContainer
              data={data}
              error={error}
              loading={loading}
              handleCharacterClick={handleCharacterClick}
            />
          </div>
        </div>
      </div>

      <div>
        <div
          className={`max-sm:visible md:hidden w-[50px] h-[50px] bg-primary fixed bottom-10 right-10 rounded-full flex justify-center items-center cursor-pointer transition-transform duration-300 transform ${
            isDrawerOpen ? "rotate-180" : "rotate-0"
          }`}
          onClick={toggleDrawer}
        >
          <img src={FilterImage} width={20} height={20} alt="Filter Icon" />
        </div>

        <div
          className={`h-[500px] border-t-primary border-t-4  bg-backgroundGray rounded-t-md fixed w-full bottom-0 left-0 right-0 transition-transform duration-400 transform ${
            isDrawerOpen ? "translate-y-0 " : "translate-y-full"
          }`}
        >
          <div
            className="right-5 absolute
          top-5"
            onClick={toggleDrawer}
          >
            <img src={CloseImage} width={20} height={20} alt="Close Icon" />
          </div>
          <div className="mt-5 px-3 ">
            <h2>Filters</h2>
            <div className="mt-2 flex flex-col gap-5 ">
              {[genderFilter, statusFilter].map((filter) => {
                return (
                  <Accordion title={filter.filterTitle}>
                    <FilterOptions
                      options={filter.filterOptions}
                      selectedFilter={filter.selectedFilterValues}
                      handleFilter={filter?.filterHandler}
                    />
                  </Accordion>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
