import cn from "classnames";
import { useTranslation } from "next-i18next";
import { IconType } from "react-icons";

interface TextIconProps {
  className?: string;
  iconColor: string;
  text: string;
  icon?: IconType;
}
const TextIcon: React.FC<TextIconProps> = ({
  className,
  icon: Icon,
  iconColor,
  text,
}) => {
  const { t } = useTranslation("common");

  return (
    <div className={cn("delivery-address", className)}>
      <button className="inline-flex items-center text-15px text-brand-dark tracking-[0.1px]">
        {Icon && <Icon size={18} color={iconColor} />}
        <span className="ltr:pl-1.5 lg:rtl:pr-1.5">{t(text)}</span>
      </button>
    </div>
  );
};

export default TextIcon;
