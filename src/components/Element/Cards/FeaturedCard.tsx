import Heading from "@components/Element/Heading";
import Link from "next/link";
import cn from "classnames";
import { LinkProps } from "next/link";
import { useTranslation } from "next-i18next";

interface ItemProps {
  icon: JSX.Element;
  title: string;
  href: LinkProps["href"];
  bgColor: string;
}

interface Props {
  className?: string;
  item: ItemProps;
}

const FeaturedCard: React.FC<Props> = ({ item, className }) => {
  const { t } = useTranslation("common");
  const { icon, title, href, bgColor } = item;
  return (
    <Link href={href}>
      <div
        className={cn(
          "group p-5 xl:p-6 3xl:p-7 flex items-center rounded-lg shadow-sm",
          className
        )}
        style={{ backgroundColor: bgColor }}
      >
        <div className="flex shrink-0 items-center justify-center bg-brand-light rounded-full w-[65px] md:w-[70px] xl:w-20 3xl:w-[90px] h-[65px] md:h-[70px] xl:h-20 3xl:h-[90px] shadow-featured">
          {icon}
        </div>
        <div className="ltr:pl-4 rtl:pr-4 md:ltr:pl-5 md:rtl:pr-5 lg:ltr:pl-4 lg:rtl:pr-4 3xl:ltr:pl-6 3xl:rtl:pr-6">
          <Heading variant="title" className="mb-2 md:mb-3 -mt-0.5">
            {t(title)}
          </Heading>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedCard;
