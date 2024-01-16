import Accordion from "components/Accordion/Accordion";
import FilterOptions from "components/FilterOptions/FilterOptions";
const HomeFilterContainer = ({ filters }) => {
  return (
    <div className="sticky top-0  w-34 p-2 basis-1/4 max-sm:hidden">
      <div className="">
        <h2>Filters</h2>
        <div className="mt-2 flex flex-col gap-5 ">
          {filters.map((filter) => {
            return (
              <Accordion title={filter.filterTitle}>
                <FilterOptions
                  options={filter.filterOptions}
                  selectedFilter={filter.selectedFilterValues}
                  handleFilter={filter.filterHandler}
                />
              </Accordion>
            );
          })}
    
        </div>
      </div>
    </div>
  );
};

export default HomeFilterContainer;
