import React from "react";
import { useTranslation } from "next-i18next";
import { RiSearchLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import cn from "classnames";

type SearchProps = {
  className?: string;
  searchId?: string;
  onSubmit?: (e: React.SyntheticEvent) => void;
  onClear?: (e: React.SyntheticEvent) => void;
  onFocus?: (e: React.SyntheticEvent) => void;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  variant?: "border" | "fill";
};

const SearchBox = React.forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      className,
      searchId = "search",
      value,
      onSubmit,
      onClear,
      onFocus,
      ...rest
    },
    ref
  ) => {
    const { t } = useTranslation("forms");
    return (
      <form
        className="relative flex w-full rounded-md"
        noValidate
        role="search"
        onSubmit={onSubmit}
      >
        <label htmlFor={searchId} className="flex flex-1 items-center">
          <input
            id={searchId}
            className={cn(
              "outline-none w-full h-[48px] ps-10 md:ps-12 pe-2 md:pe-16 text-black text-sm lg:text-15px placeholder-slate-900 rounded-md transition-all duration-200 border border-brand-gray focus:border-brand focus:placeholder-transparent"
            )}
            placeholder={t("placeholder-search") as string}
            aria-label={searchId}
            autoComplete="off"
            value={value}
            onFocus={onFocus}
            {...rest}
          />
        </label>
        {value ? (
          <button
            type="button"
            onClick={onClear}
            title="Clear search"
            className="outline-none absolute top-0 end-0 w-14 md:w-16 h-full flex items-center justify-center transition duration-200 ease-in-out hover:text-heading focus:outline-none"
          >
            <AiOutlineClose className="w-[17px] h-[17px]" />
          </button>
        ) : (
          <span className="w-14 md:w-16 h-full absolute top-0 start-0 flex flex-shrink-0 justify-center items-center focus:outline-none">
            <RiSearchLine className="w-5 h-5" />
          </span>
        )}
      </form>
    );
  }
);

export default SearchBox;

SearchBox.displayName = "SearchBox";
