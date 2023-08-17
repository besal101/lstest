import * as React from "react";

interface IRadioButtonProps {
  name: string;
  value: string;
  onbuttonClick: (value: string, name: string) => void;
}

const RadioButton: React.FC<IRadioButtonProps> = ({
  name,
  value,
  onbuttonClick,
}) => {
  const handleButtonClick = () => {
    onbuttonClick(value, name);
  };
  return (
    <>
      <label
        htmlFor={value}
        className="relative flex items-center cursor-pointer p-3 rounded-full overflow-hidden"
      >
        <input
          id={value}
          name="type"
          type="radio"
          className="peer relative appearance-none w-5 h-5 border rounded-full border-gray-500 cursor-pointer transition-all before:content[''] before:block before:bg-red-gray-500 before:w-12 before:h-12 before:rounded-full before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 hover:before:opacity-10 before:transition-opacity text-brand-tertiary checked:border-brand-tertiary checked:before:bg-brand-tertiary"
          onChange={handleButtonClick}
        />

        <span className="absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
          </svg>
        </span>
      </label>
      <label
        htmlFor={value}
        className="text-gray-700 font-light select-none cursor-pointer mt-px"
      >
        {name}
      </label>
    </>
  );
};

export default RadioButton;
