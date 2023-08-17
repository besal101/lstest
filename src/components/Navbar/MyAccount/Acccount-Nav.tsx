import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import LogoutIcon from "@components/icons/logout";

type Option = {
  name: string;
  slug: string;
  icon?: JSX.Element;
};

export default function AccountNav({ options }: { options: Option[] }) {
  const { t } = useTranslation("common");
  const { pathname } = useRouter();
  const newPathname = pathname.split("/").slice(2, 3);
  let mainPath = `/${newPathname[0]}`;
  if (mainPath === "/undefined") {
    mainPath = "/account-settings";
  }
  return (
    <nav className="flex flex-col pb-2 md:pb-6 border border-border-one rounded-md overflow-hidden">
      {options.map((item) => {
        const menuPathname = item.slug.split("/").slice(2, 3);
        const menuPath = `/${menuPathname[0]}`;

        return (
          <Link
            key={item.slug}
            href={item.slug}
            className={`flex items-center cursor-pointer text-sm lg:text-15px text-brand-dark py-3.5 px-3.5 xl:px-4 2xl:px-5 mb-1 ${
              mainPath === menuPath ? "bg-fill-base font-medium" : "font-normal"
            }`}
          >
            <span className="w-9 xl:w-10 shrink-0 flex justify-center">
              {item.icon}
            </span>
            <span className="ltr:pl-1 lg:rtl:pr-1.5">{t(item.name)}</span>
          </Link>
        );
      })}
      <button
        className="flex items-center text-sm lg:text-15px text-brand-dark py-3.5 px-3.5 xl:px-4 2xl:px-5 mb-1 cursor-pointer focus:outline-none"
        onClick={() => console.log("logout")}
      >
        <span className="w-9 xl:w-10 shrink-0 flex justify-center">
          <LogoutIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />
        </span>
        <span className="ltr:pl-1 lg:rtl:pr-1.5">{t("text-logout")}</span>
      </button>
    </nav>
  );
}
