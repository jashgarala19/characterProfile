import { useState, MouseEvent } from "react";

export const Filter = (
  initialValue: string | string[] = ""
): [string | string[], (e: MouseEvent, value: string) => void] => {
  const [filter, setFilter] = useState<string | string[]>(initialValue);

  const handleFilter = (e: MouseEvent, value: string): void => {
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

interface FilterState {
  filterTitle: string;
  filterOptions: string[];
  initialValue?: string | string[];
  isMultiSelect?: boolean;
}

export const createFilterState = ({
  filterTitle,
  filterOptions,
  initialValue = "",
  isMultiSelect = false,
}: FilterState) => {
  const [filter, handleFilter] = Filter(initialValue);

  return {
    filterTitle,
    filterOptions,
    selectedFilterValues: filter,
    filterHandler: handleFilter,
    isMultiSelect,
  };
};

export default Filter;
