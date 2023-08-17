import Heading from "@components/Element/Heading";
import Image from "next/image";
import Link, { LinkProps } from "next/link";
import Text from "@components/Element/Text";
import { useTranslation } from "next-i18next";
import { collectionPlaceholder } from "@components/Loaders/LoaderImage";

interface Props {
  imgWidth?: number;
  imgHeight?: number;
  href: LinkProps["href"];
  collection: {
    image: string;
    title: string;
    description?: string;
  };
}

const CollectionCard: React.FC<Props> = ({
  collection,
  imgWidth = 440,
  imgHeight = 280,
  href,
}) => {
  const { image, title, description } = collection;
  const { t } = useTranslation("common");
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-md shadow-card hover:shadow-navigation transition duration-300 ease-in-out"
    >
      <Image
        src={image ?? collectionPlaceholder}
        alt={t(title) || t("text-card-thumbnail")}
        width={imgWidth}
        height={imgHeight}
        className="bg-skin-thumbnail object-cover transform transition duration-300"
      />
      <div className="px-4 lg:px-5 xl:px-6 pt-4 lg:pt-5 pb-4 md:pb-5 lg:pb-6 xl:pb-7 flex flex-col">
        <Heading
          variant="title"
          className="mb-0.5 lg:mb-1 truncate group-hover:color-brand-gray"
        >
          {t(title)}
        </Heading>
        <Text variant="medium" className="truncate">
          {t(`${description}`)}
        </Text>
      </div>
    </Link>
  );
};

export default CollectionCard;
