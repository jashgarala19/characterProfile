import  { ChangeEvent } from "react";

interface InputProps {
  value: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  name,
  onChange,
  placeholder,
  autoComplete = "off",
}) => {
  return (
    <input
      name={name}
      type="text"
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      autoComplete={autoComplete}
      className="px-2 py-2  focus:border-2 border-primary focus:outline-none flex-1"
    />
  );
};

export default Input;
