import * as React from "react";
import cn from "classnames";

interface IContainerProps {
  children: React.ReactNode;
  className?: string;
  clean?: boolean;
  el?: keyof JSX.IntrinsicElements;
}

const Container: React.FC<IContainerProps> = ({
  children,
  className,
  clean,
  el = "div",
}) => {
  const rootClassName = cn(className, {
    "mx-auto max-w-[2520px] xl:px-20 md:px-10 sm:px-2 px-4": !clean,
  });

  const Component = el as React.ElementType;

  return <Component className={rootClassName}>{children}</Component>;
};

export default Container;
