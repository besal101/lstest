import * as React from "react";
import Container from "@components/Container";
import { RiMapPinLine } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa";
import { LanguageSwitcher } from "@components/shared";

interface IBottomNavbarProps {}

const BottomNavbar: React.FC<IBottomNavbarProps> = (props) => {
  return (
    <div className="hidden lg:block shadow-navigation">
      <Container className="h-9 flex justify-between items-center">
        <div className="flex flex-row gap-3 text-sm lg:text-15px">
          <p className="cursor-pointer hover:underline">Deals</p>
          <span className="ml-2 mr-2">|</span>
          <p className="cursor-pointer hover:underline">Pots & Casseroles</p>
          <p className="cursor-pointer hover:underline">Pans</p>
          <p className="cursor-pointer hover:underline">Cake molds</p>
        </div>
        {/* <div className="flex flex-row gap-4 item">
          <div className="flex items-center text-sm lg:text-15px">
            <div className="delivery-address">
              <button className="inline-flex items-center">
                <RiMapPinLine className="w-5 h-5" />
                <span className="ps-1.5 text-muted">Delivery:</span>
                <span className="font-semibold text-black relative top-[1px] ps-1">
                  Home address
                </span>
                <span className="relative top-0.5">
                  <FaChevronDown
                    className="w-7 h-3.5 text-base opacity-40"
                    aria-hidden="true"
                  />
                </span>
              </button>
            </div>
          </div>
          <div>
            <LanguageSwitcher />
          </div>
        </div> */}
      </Container>
    </div>
  );
};

export default BottomNavbar;
