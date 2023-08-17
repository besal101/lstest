import React, { CSSProperties } from "react";
import cn from "classnames";

interface Props {
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode | any;
  html?: string;
}

type Variant = "body" | "medium" | "small";

const Text: React.FC<Props> = ({
  style,
  className,
  variant = "body",
  children,
  html,
}) => {
  const htmlContentProps = html
    ? {
        dangerouslySetInnerHTML: { __html: html },
      }
    : {};

  return (
    <p
      className={cn(
        "text-brand-muted leading-7",
        {
          "lg:leading-[27px] lg:text-15px text-sm": variant === "body", // default body text
          "lg:text-15px xl:text-base sm:text-xs text-xs": variant === "medium",
          "lg:leading-[1.85em] text-xs": variant === "small",
        },
        className
      )}
      style={style}
      {...htmlContentProps}
    >
      {children}
    </p>
  );
};

export default Text;
