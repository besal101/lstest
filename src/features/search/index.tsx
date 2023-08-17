import React, { useEffect, useState } from "react";
import cn from "classnames";
import useFreezeBodyScroll from "@utils/use-freeze-body-scroll";
import SearchBox from "./Searchbox";
import Scrollbar from "src/libs/Scrollbar";
import SearchResult from "./SearchResult";
import SearchResultLoader from "@components/Loaders/search-result-loader";
import { useAppSelector, useAppDispatch } from "@hooks/useRedux";
import { setSearch, setMobileSearch } from "@features/theme/themeSlice";
import { useKeywordSearch } from "@query/search/useSearch";

interface ISearchProps {
  className?: string;
}

const Search = React.forwardRef<HTMLDivElement, ISearchProps>(
  ({ className = "md:w-[730px] 2xl:w-[800px]" }, ref) => {
    const { displaySearch, displayMobileSearch } = useAppSelector(
      (state) => state.theme
    );
    const dispatch = useAppDispatch();
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const [searchText, setSearchText] = useState("");
    const [containerHeight, setContainerHeight] = useState<number>(380);

    const {
      data: Suggestions,
      isLoading,
      isError,
    } = useKeywordSearch(searchText);

    function handleSearch(e: React.SyntheticEvent) {
      e.preventDefault();
    }

    function handleAutoSearch(e: React.FormEvent<HTMLInputElement>) {
      setSearchText(e.currentTarget.value);
    }

    function enableInputFocus() {
      setInputFocus(true);
    }

    useFreezeBodyScroll(
      inputFocus === true || displaySearch || displayMobileSearch
    );

    function clear() {
      setInputFocus(false);
      setSearchText("");
      dispatch(setSearch(false));
      dispatch(setMobileSearch(false));
    }
    return (
      <div
        ref={ref}
        className={cn(
          "w-full transition-all duration-200 ease-in-out",
          className
        )}
      >
        <div
          className={cn(
            "overlay cursor-pointer invisible w-full h-full opacity-0 flex top-0 ltr:left-0 rtl:right-0 transition-all duration-300 fixed",
            {
              open: displayMobileSearch,
              "input-focus-overlay-open": inputFocus === true,
              "open-search-overlay": displaySearch,
            }
          )}
          onClick={() => clear()}
        />
        <div className="relative z-30 flex flex-col justify-center w-full shrink-0">
          <div className="flex flex-col w-full mx-auto">
            <SearchBox
              searchId="search"
              name="search"
              value={searchText}
              onSubmit={handleSearch}
              onChange={handleAutoSearch}
              onClear={clear}
              onFocus={() => enableInputFocus()}
            />
          </div>
          {searchText && (
            <div className="w-full absolute top-[56px] start-0 py-2.5 bg-white rounded-md flex flex-col overflow-hidden shadow-dropDown z-30">
              <Scrollbar className="os-host-flexbox">
                <div className="w-full max-h-[380px]">
                  {isLoading ? (
                    Array.from({ length: 15 }).map((_, idx) => (
                      <div
                        key={`search-result-loader-key-${idx}`}
                        className="py-2.5 ps-5 pe-10 scroll-snap-align-start"
                      >
                        <SearchResultLoader
                          key={idx}
                          uniqueKey={`top-search-${idx}`}
                        />
                      </div>
                    ))
                  ) : Suggestions?.keywords?.length === 0 ? (
                    <div className="group w-full h-auto flex justify-start items-center">
                      <div className="flex flex-col w-full overflow-hidden py-2.5 ps-5 pe-10">
                        <h3 className="truncate text-skin-base text-15px capitalize">
                          No Products found. Try using other keywords.
                        </h3>
                      </div>
                    </div>
                  ) : (
                    Suggestions?.keywords?.map((item: any, index: number) => (
                      <div
                        key={`search-result-key-${index}`}
                        className="py-2.5 ps-5 pe-10 scroll-snap-align-start transition-colors duration-200 hover:bg-skin-two"
                        onClick={clear}
                      >
                        <SearchResult
                          key={index}
                          item={item}
                          searchKeyword={searchText}
                        />
                      </div>
                    ))
                  )}
                </div>
              </Scrollbar>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Search.displayName = "Search";
export default Search;
