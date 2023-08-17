import Container from "@components/Container";
import * as React from "react";
import WidgetLink from "./WidgetLink";
import Heading from "@components/Element/Heading";
import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";

interface IWidgetsProps {
  widgets: {
    id: number;
    widgetTitle: string;
    lists: any;
  }[];
  social: {
    id: number;
    icon: IconType;
    path: string;
    width: number;
    height: number;
  }[];
}

const Widgets: React.FunctionComponent<IWidgetsProps> = ({
  widgets,
  social,
}) => {
  return (
    <Container>
      <div className="px-3 md:px-12 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-3 gap-x-10 sm:gap-7 lg:gap-11 xl:gap-7 py-6">
          {widgets?.map((widget) => (
            <WidgetLink
              key={`footer-widget--key${widget.id}`}
              data={widget}
              className="pb-3.5 sm:pb-0"
            />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row space-y-3 justify-between py-6">
          <div className="flex flex-col">
            <Heading variant="title" className="mb-2 sm:mb-3.5 lg:mb-2 pb-0.5">
              Download Our App
            </Heading>
            <div className="flex flex-row gap-2">
              <Image
                src="/mobile-app-store.png"
                alt="Mobile App"
                height={60}
                width={120}
                className="bg-fill-thumbnail rounded-lg"
              />
              <Image
                src="/mobile-android-store.png"
                alt="Mobile App"
                height={60}
                width={120}
                className="bg-fill-thumbnail rounded-lg"
              />
            </div>
          </div>
          <div className="">
            <Heading variant="title" className="mb-2 sm:mb-3.5 lg:mb-2 pb-0.5">
              Connect with us
            </Heading>
            <div className="flex flex-row gap-2">
              {social?.map((item) => (
                <Link
                  href={item.path}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-brand"
                  key={`footer-social--key${item.id}`}
                >
                  <item.icon className="text-3xl text-white cursor-pointer p-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Widgets;
