import { useState, ReactNode } from "react";

interface AccordionProps {
  children: ReactNode;
  title: string;
}

const Accordion: React.FC<AccordionProps> = ({ children, title }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <div className="bg-white p-3 w-full h-[auto] cursor-pointer">
      <div className="flex items-center " onClick={(e) => handleOpen(e)}>
        <div></div>
        <div className="flex-1">
          <p className="text-primary select-none">{title} </p>
        </div>
        {/* <div className='text-gray text-sm'>Clear</div> */}
      </div>
      {open ? children : null}
    </div>
  );
};

export default Accordion;
