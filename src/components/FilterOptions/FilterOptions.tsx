import React from "react";
import Chip from "components/Chip/Chip";

const FilterOptions = ({ options, selectedFilter, handleFilter }) => {
  return (
    <div className="w-full gap-3 flex flex-row mt-4 flex-wrap">
      {options.map((option) => (
        <Chip
          key={option}
          text={option}
          handleClick={(e) => handleFilter(e, option)}
          isActive={selectedFilter === option}
        />
      ))}
    </div>
  );
};

export default FilterOptions;
