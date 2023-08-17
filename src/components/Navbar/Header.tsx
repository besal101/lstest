import Container from "@components/Container";
import { LanguageSwitcher } from "@components/shared";
import { OpenModal } from "@features/modal/modalSlice";
import Search from "@features/search";
import { setSearch, setMobileSearch } from "@features/theme/themeSlice";
import { useActiveScroll } from "@hooks/useActiveScroll";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import { MENUROUTES } from "@utils/routes";
import cn from "classnames";
import React, { useCallback, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { RiMapPinLine, RiSearchLine } from "react-icons/ri";
import Logo from "../Element/Logo";
import CartButton from "./CartButton";
import HeaderMenu from "./HeaderMenu";
import Profile from "./Profile";
import { IoReorderThree } from "react-icons/io5";
import useOnClickOutside from "@hooks/useClickOutside";
import { HambergerIcon } from "@components/icons/Hamberger";
import { SearchIcon } from "@components/icons/Search";

type DivElementRef = React.MutableRefObject<HTMLDivElement>;

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = () => {
  const { displaySearch, displayMobileSearch } = useAppSelector(
    (state) => state.theme
  );

  const { location } = useAppSelector((state) => state.location);

  const dispatch = useAppDispatch();

  const handleaddress = useCallback(() => {
    dispatch(OpenModal({ type: "open", view: "DELIVERY_VIEW", payload: null }));
  }, [dispatch]);

  const handleSearch = useCallback(() => {
    dispatch(setSearch(!displaySearch));
  }, [dispatch, displaySearch]);

  const handleMobileSearch = useCallback(() => {
    dispatch(setMobileSearch(!displayMobileSearch));
  }, [dispatch, displayMobileSearch]);

  const siteHeaderRef = useRef() as DivElementRef;
  const siteSearchRef = useRef() as DivElementRef;

  const isScrolling = useActiveScroll(siteHeaderRef, 40);

  useOnClickOutside(siteSearchRef, () => {
    dispatch(setMobileSearch(!displayMobileSearch));
  });

  return (
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className={cn(
        "header sticky-header sticky top-0 z-20 lg:relative w-full h-16 lg:h-auto",
        displayMobileSearch && "active-mobile-search",
        isScrolling && "is-scrolling"
      )}
    >
      <div className="z-20 w-screen transition-all duration-200 ease-in-out innerSticky lg:w-full font-body bg-brand-lightOne">
        {/* MOBILE SEARCH START */}
        {displayMobileSearch && (
          <Search
            ref={siteSearchRef}
            className="top-bar-search hidden lg:max-w-[600px] absolute z-30 px-4 md:px-6 top-1"
          />
        )}

        {/* MOBILE SEARCH CLOSE */}

        <Container className="border border-b-base md:py-2">
          <div
            className="
            flex  
            flex-row 
            items-center 
            justify-between
            md:justify-evenly
            gap-3
            md:gap-0
            lg:gap-16
            px-1
            sm:px-4
            md:px-16
          "
          >
            <HambergerIcon
              className="h-7 w-7 me-2 block md:hidden"
              color="#0F172A"
            />
            <Logo className="logo md:-mt-1" />

            <Search className="hidden lg:flex lg:max-w-[750px] 2xl:max-w-[900px] lg:ltr:ml-4 lg:rtl:mr-4 lg:ltr:mr-5 lg:rtl:ml-5" />

            <div className="flex flex-shrink-0 space-s-5 xl:space-s-7">
              <div onClick={(e) => handleMobileSearch()}>
                <SearchIcon
                  className="h-7 w-7 me-2 block md:hidden"
                  color="#0F172A"
                />
              </div>
              <Profile />
              <CartButton />
            </div>
          </div>
        </Container>
        <div className="hidden navbar bg-brand-light lg:block drop-shadow-sm">
          <Container
            className={`flex items-center justify-between ${
              isScrolling ? "h-16" : "h-10"
            }`}
          >
            {isScrolling ? (
              <div
                className="
                flex  
                flex-row 
                items-center 
                justify-evenly
                gap-3
                md:gap-0
                lg:gap-16
                px-16
              "
              >
                <Logo className="w-0 transition-all duration-200 ease-in-out opacity-0 navbar-logo" />
                <div
                  className="absolute top-0 left-0 flex items-center justify-center w-full h-full px-4 sticky-search"
                  onClick={(e) => handleSearch()}
                >
                  <Search className="max-w-[980px] xl:max-w-[830px] 2xl:max-w-[1000px]" />
                </div>
              </div>
            ) : (
              <HeaderMenu
                data={MENUROUTES}
                className="flex transition-all duration-200 ease-in-out"
              />
            )}

            {/* End of main menu */}

            {/* End of conditional search  */}

            <div className="flex items-center ltr:ml-auto rtl:mr-auto shrink-0">
              <div className="delivery-address flex items-center">
                <button
                  className="inline-flex items-center"
                  onClick={handleaddress}
                >
                  <RiMapPinLine className="w-5 h-5" />
                  <span className="ps-1 text-sm font-normal text-brand-dark">
                    Delivery:
                  </span>
                  <span className="font-medium text-sm text-brand-dark ps-1">
                    {location.length > 0
                      ? location[0].state
                      : "Select Location"}
                  </span>
                  <span className="relative top-0.5">
                    <FaChevronDown
                      className="w-7 h-3.5 text-base opacity-40"
                      aria-hidden="true"
                    />
                  </span>
                </button>
              </div>
              {isScrolling && (
                <>
                  <Profile />
                  <CartButton className="hidden lg:flex" />
                </>
              )}

              <div className="languageSwitcher">
                <div className="xl:mx-3.5 mx-2.5">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
};

export default Header;
