interface ChipProps {
  text: string;
  isActive?: boolean;
  handleClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Chip: React.FC<ChipProps> = ({ text, isActive = false, handleClick }) => {
  const isActiveClass = "bg-primary border-0 text-white";
  const inActiveClass = "border-borderGray text-primary";

  return (
    <div
      className={`w-auto cursor-pointer inline-block p-1 px-2 border text-center ${
        isActive ? isActiveClass : inActiveClass
      }`}
      onClick={handleClick}
    >
      <p className="select-none">{text}</p>
    </div>
  );
};

export default Chip;
