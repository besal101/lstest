import { useTranslation } from "next-i18next";
import cn from "classnames";
import Heading from "./Heading";
import Text from "./Text";

interface Props {
  sectionHeading?: string;
  sectionSubHeading?: string;
  className?: string;
  headingPosition?: "left" | "center";
}

const SectionHeader: React.FC<Props> = ({
  sectionHeading = "text-section-title",
  sectionSubHeading,
  className = "flex flex-col gap-1 py-2",
  headingPosition = "left",
}) => {
  const { t } = useTranslation("common");
  return (
    <div
      className={cn(` ${className}`, {
        "text-center pb-2 lg:pb-3 xl:pb-4 3xl:pb-7":
          headingPosition === "center",
      })}
    >
      <Heading
        variant="heading"
        className={cn({
          "3xl:text-[25px] 3xl:leading-9": headingPosition === "center",
        })}
      >
        {t(sectionHeading)}
      </Heading>
      {sectionSubHeading && (
        <Text variant="medium" className="pb-0.5 font-medium">
          {t(sectionSubHeading)}
        </Text>
      )}
    </div>
  );
};

export default SectionHeader;
