import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { getDirection } from "@utils/getDirection";
import cn from "classnames";
import { categoryPlaceholder } from "@components/Loaders/LoaderImage";

import Link, { LinkProps } from "next/link";
import Image from "next/image";
import { CDN_URL_CATEGORY } from "@utils/routes";

interface Props {
  item: any;
  href: LinkProps["href"];
  className?: string;
}

const CategoryCard: React.FC<Props> = ({ item, href, className }) => {
  const { t } = useTranslation("common");
  const { name, image } = item ?? {};
  const { locale } = useRouter();
  const dir = getDirection(locale);
  return (
    <Link
      href={href}
      className={cn(
        "block w-full text-center hover:border hover:border-border-one hover:bg-border-one hover:shadow-md",
        className
      )}
    >
      <div className="flex flex-col justify-evenly max-w-[179px] mb-3.5 xl:mb-4 mx-auto overflow-hidden p-1">
        <div
          className={`flex flex-shrink-0 transition-all duration-700 w-full h-full transform`}
        >
          <Image
            src={`${CDN_URL_CATEGORY}/${image}` ?? categoryPlaceholder}
            alt={name || t("text-card-thumbnail")}
            width={179}
            height={200}
            quality={100}
            className="object-cover"
          />
        </div>
        <h3 className="capitalize text-skin-base text-sm sm:text-15px lg:text-base truncate">
          {name}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
