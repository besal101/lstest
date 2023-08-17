import { useTranslation } from "next-i18next";
import * as React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main
        className="relative flex-grow"
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
