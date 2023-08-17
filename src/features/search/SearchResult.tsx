import { ROUTES } from "@utils/routes";
import Link from "next/link";
import * as React from "react";

interface ISearchResultProps {
  item: string;
  searchKeyword: string;
}

const SearchResult: React.FC<ISearchResultProps> = ({
  item,
  searchKeyword,
}) => {
  const getMatchedParts = (text: string, keyword: string) => {
    const regex = new RegExp(`(${keyword})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={index} className="font-bold">
          {part}
        </span>
      ) : (
        <React.Fragment key={index}>{part}</React.Fragment>
      )
    );
  };

  return (
    <Link
      href={`${ROUTES.SEARCH}?q=${item}`}
      className="group w-full h-auto flex justify-start items-center"
    >
      <div className="flex flex-col w-full overflow-hidden">
        <h3 className="truncate text-skin-base text-15px capitalize">
          {getMatchedParts(item, searchKeyword)}
        </h3>
      </div>
    </Link>
  );
};

export default SearchResult;
