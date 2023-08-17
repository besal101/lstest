import Container from "@components/Container";
import SectionHeader from "@components/Element/SectionHeader";
import * as React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { IoMailOutline } from "react-icons/io5";

interface ITopFooterProps {}

const TopFooter: React.FunctionComponent<ITopFooterProps> = ({}) => {
  return (
    <div className="border-b-2 border-border-one py-6">
      <Container>
        <div className="flex flex-row items-center justify-between w-full px-2 md:px-8">
          <div className="hidden md:block">
            <div className="flex flex-col">
              <SectionHeader
                sectionHeading="we-are-here-to-help"
                sectionSubHeading="reach-out-to-us"
                headingPosition="left"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <div className="flex flex-row test">
              <div className="bg-brand-light rounded-full  shadow-md w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                <FiPhoneCall className="p-0.2 md:p-0.5 w-4 h-4 md:w-6 md:h-6" />
              </div>
              <div className="flex flex-col rtl:mr-1.5 ltr:ml-1.5">
                <span className="text-xs md:text-sm ">Call Support</span>
                <span className="text-xs md:text-sm lg:text-base font-bold">
                  +971 521573960
                </span>
              </div>
            </div>
            <div className="flex flex-row test">
              <div className="bg-brand-light rounded-full  shadow-md w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                <IoMailOutline className="p-0.2 md:p-0.5 w-4 h-4 md:w-6 md:h-6" />
              </div>
              <div className="flex flex-col rtl:mr-1.5 ltr:ml-1.5">
                <span className="text-xs md:text-sm ">Email Support</span>
                <span className="text-xs md:text-sm lg:text-base font-bold">
                  help@lifesmile.ae
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TopFooter;
