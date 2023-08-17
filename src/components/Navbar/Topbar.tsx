import Container from "@components/Container";
import * as React from "react";

interface ITopbarProps {}

const Topbar: React.FC<ITopbarProps> = (props) => {
  return (
    <div className="hidden md:block">
      <div className="flex items-center">
        <div className="bg-brand text-white w-full">
          <Container>
            <div className="flex-row justify-between items-center sm:flex py-1.5 text-sm ltr:mr-2.5 rtl:ml-2.5">
              <div className="flex flex-row gap-4 items-center justify-center">
                <span className="text-sm font-medium">APP EXCLUSIVE</span>|
                <span className="uppercase text-sm font-medium">
                  Get Extra 10% OFF Use Coupon APP10
                </span>
              </div>
              <div className="flex flex-row gap-4 items-center justify-center">
                <span className="text-sm font-medium">Download our App</span>|
                <span className="text-sm font-medium">
                  Fast & Free Shipping Over AED 200*
                </span>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
