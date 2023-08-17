import { useTranslation } from "next-i18next";
import Heading from "@components/Element/Heading";
import Link from "next/link";

interface Props {
  className?: string;
  data: {
    widgetTitle?: string;
    lists: {
      id: string;
      path?: string;
      title: string;
      icon?: any;
    }[];
  };
}

const WidgetLink: React.FC<Props> = ({ className, data }) => {
  const { widgetTitle, lists } = data;
  const { t } = useTranslation("common");
  return (
    <div className={`${className}`}>
      <Heading
        variant="title"
        className="mb-2 sm:mb-3.5 lg:mb-4 pb-0.5 text-sm md:text-lg"
      >
        {t(`${widgetTitle}`)}
      </Heading>
      <ul className="text-xs sm:text-sm lg:text-15px flex font-medium flex-col space-y-2.5">
        {lists.map((list) => (
          <li
            key={`widget-list--key${list.id}`}
            className="flex items-baseline"
          >
            <Link
              href={list.path ? list.path : "#!"}
              className="transition-colors duration-200 text-brand-gray hover:text-black"
            >
              {t(`${list.title}`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetLink;
