import Link from "next/link";
import { useTranslation } from "next-i18next";
import cn from "classnames";
import { ROUTES } from "@utils/routes";

interface MenuProps {
  data: any;
  className?: string;
}

const HeaderMenu: React.FC<MenuProps> = ({ data, className }) => {
  const { t } = useTranslation("item");
  return (
    <nav
      className={cn(
        "headerMenu flex w-full relative -mx-3 xl:-mx-4",
        className
      )}
    >
      {data?.map((item: any) => (
        <div
          className="relative py-3 mx-3 cursor-pointer menuItem group xl:mx-4"
          key={item.id}
        >
          <Link
            href={`${ROUTES.CATEGORY}/${item.path}`}
            className="relative inline-flex items-center py-1.5 text-sm font-medium text-brand-dark group-hover:text-brand before:absolute before:w-0 before:ltr:right-0 rtl:left-0 before:bg-brand before:h-[3px] before:transition-all before:duration-300 before:-bottom-[14px] "
          >
            {t(item.label)}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default HeaderMenu;
