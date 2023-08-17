import Container from "@components/Container";
import * as React from "react";
import TopFooter from "./TopFooter";
import Widgets from "./Widgets";
import Copyright from "./Copyright";
import { footer } from "@utils/routes";

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  const { widgets, payment, social } = footer;
  return (
    <footer className="mt-[50px] lg:mt-14 2xl:mt-16 bg-brand-lightgray">
      <TopFooter />
      <Widgets widgets={widgets} social={social} />
      <Copyright payment={payment} />
    </footer>
  );
};

export default Footer;
