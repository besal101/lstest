import React, { JSXElementConstructor, CSSProperties } from "react";
import cn from "classnames";

interface Props {
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode | any;
  html?: string;
}

type Variant =
  | "mediumHeading"
  | "heading"
  | "base"
  | "title"
  | "titleMedium"
  | "titleLarge"
  | "productHeading"
  | "subHeading"
  | "checkoutHeading";

const Heading: React.FC<Props> = ({
  style,
  className,
  variant = "base",
  children,
  html,
}) => {
  const componentsMap: {
    [P in Variant]: React.ComponentType<any> | string;
  } = {
    base: "h3",
    heading: "h2",
    mediumHeading: "h3",
    title: "h2", // Collection card
    titleMedium: "h3",
    titleLarge: "h2",
    productHeading: "h1",
    subHeading: "h2",
    checkoutHeading: "h3",
  };

  const Component:
    | JSXElementConstructor<any>
    | React.ReactElement<any>
    | React.ComponentType<any>
    | string = componentsMap![variant!];

  const htmlContentProps = html
    ? {
        dangerouslySetInnerHTML: { __html: html },
      }
    : {};

  return (
    <Component
      className={cn(
        "text-brand-dark",
        {
          "text-15px sm:text-base font-semibold": variant === "base",
          "text-base xl:text-lg xl:leading-7 font-semibold font-body":
            variant === "title",
          "font-semibold text-brand-dark text-xl": variant === "titleMedium",
          "text-base lg:text-lg xl:text-[20px] font-semibold xl:leading-8":
            variant === "titleLarge",
          "text-base lg:text-[17px] lg:leading-7 font-medium":
            variant === "mediumHeading",
          "text-lg lg:text-xl xl:text-[22px] xl:leading-8 font-bold font-body":
            variant === "heading",
          "text-lg lg:text-xl xl:text-[26px] xl:leading-8 font-semibold text-brand-dark ":
            variant === "checkoutHeading",
          "text-lg sm:text-3xl font-bold md:font-semibold leading-6 md:leading-10 w-full line-clamp-3 antialiased hover:subpixel-antialiased tracking-tight":
            variant === "productHeading",
        },
        className
      )}
      style={style}
      {...htmlContentProps}
    >
      {children}
    </Component>
  );
};

export default Heading;
