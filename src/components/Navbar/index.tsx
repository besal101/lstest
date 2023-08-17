import * as React from "react";
import Header from "./Header";
import Topbar from "./Topbar";

interface INavbarProps {}

const Navbar: React.FC<INavbarProps> = () => {
  return (
    <>
      <Topbar />
      <Header />
    </>
  );
};

export default Navbar;
