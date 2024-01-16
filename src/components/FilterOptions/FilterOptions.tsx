import Chip from "components/Chip/Chip";

interface FilterOptionsProps {
  options: string[];
  selectedFilter: string | null;
  handleFilter: (e: React.MouseEvent<HTMLDivElement>, option: string) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  options,
  selectedFilter,
  handleFilter,
}) => {
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
