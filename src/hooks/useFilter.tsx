import { useState } from "react";

export const useFilter = (initialValue) => {
  const [filter, setFilter] = useState(initialValue);

  const handleFilter = (e, value) => {
    e.stopPropagation();
    if (Array.isArray(filter)) {
      // If the filter is an array, toggle the selected value
      const updatedFilter = filter.includes(value)
        ? filter.filter((v) => v !== value)
        : [...filter, value];
      setFilter(updatedFilter);
    } else {
      // If the filter is a single value, set it to the selected value
      setFilter(filter === value ? "" : value);
    }
  };

  return [filter, handleFilter];
};

export const createFilterState = ({
  filterTitle,
  filterOptions,
  initialValue,
  isMultiSelect,
}) => {
  const [filter, handleFilter] = useFilter(initialValue);

  return {
    filterTitle,
    filterOptions,
    selectedFilterValues: filter,
    filterHandler: handleFilter,
    isMultiSelect,
  };
};
export default useFilter;
