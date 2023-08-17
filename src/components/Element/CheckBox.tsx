import * as React from "react";
import { useRouter } from "next/router";

interface ICheckboxProps {
  name: string;
  type: string;
  slug: string;
  onCheckboxClick: (slug: string, type: string) => void;
}

const Checkbox: React.FunctionComponent<ICheckboxProps> = ({
  name,
  slug,
  type,
  onCheckboxClick,
}) => {
  const handleCheckboxClick = () => {
    onCheckboxClick(slug, type);
  };
  const router = useRouter();
  const { query } = router;

  let isChecked = false;
  if (query?.subcategory) {
    isChecked = query.subcategory.includes(slug);
  }
  if (query?.color) {
    isChecked = isChecked || query.color.includes(slug);
  }
  if (query?.size) {
    isChecked = isChecked || query.size.includes(slug);
  }

  return (
    <>
      <label
        htmlFor={slug}
        className="relative flex items-center cursor-pointer p-2 rounded-full"
      >
        <input
          id={slug}
          type="checkbox"
          name={slug}
          className="peer relative appearance-none w-5 h-5 border rounded-md border-gray-500 cursor-pointer transition-all before:content[''] before:block before:bg-red-gray-500 before:w-12 before:h-12 before:rounded-full before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 hover:before:opacity-10 before:transition-opacity checked:bg-brand-tertiary checked:border-brand-tertiary checked:before:bg-brand-tertiary"
          onChange={handleCheckboxClick}
          checked={isChecked as boolean}
        />
        <span className="text-white absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </label>
      <label
        htmlFor={slug}
        className="text-slate-700 font-normal select-none cursor-pointer"
      >
        {name}
      </label>
    </>
  );
};

export default Checkbox;
