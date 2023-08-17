import { Switch } from "@headlessui/react";
import { useRouter } from "next/router";
import { getDirection } from "@utils/getDirection";

interface SwitchProps {
  checked?: boolean;
  onChange?: (value: boolean) => void;
  variant?: "primary" | "secondary";
}

const SwitchComponent: React.FC<SwitchProps> = ({
  checked,
  onChange,
  variant,
}) => {
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const className = variant === "primary" ? "bg-brand" : "bg-brand-secondary";
  return (
    <Switch
      checked={checked!}
      onChange={onChange!}
      type="button"
      className={`${checked ? className : "bg-fill-four"}
          relative inline-flex shrink-0 h-6 lg:h-7 w-10 lg:w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-brand-light focus-visible:ring-opacity-75 focus:border-brand-primary`}
    >
      <span
        aria-hidden="true"
        className={`${
          checked
            ? dir === "rtl"
              ? "-translate-x-4 lg:-translate-x-5"
              : "translate-x-4 lg:translate-x-5"
            : "translate-x-0"
        }
            pointer-events-none inline-block h-5 lg:h-6 w-5 lg:w-6 rounded-full bg-brand-light shadow-switch transform ring-0 transition ease-in-out duration-200`}
      />
    </Switch>
  );
};

export default SwitchComponent;
