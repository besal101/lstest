import cn from "classnames";
import { forwardRef, ButtonHTMLAttributes } from "react";
import { ImSpinner2 } from "react-icons/im";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "primary" | "border" | "formButton" | "small" | "smallSecondary";
  active?: boolean;
  type?: "submit" | "reset" | "button";
  loading?: boolean;
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    variant = "primary",
    children,
    active,
    loading = false,
    disabled = false,
    ...rest
  } = props;

  const rootClassName = cn(
    "group leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-body font-semibold text-center justify-center tracking-[0.2px] rounded-lg placeholder-white focus-visible:outline-none focus:outline-none",
    {
      "h-12 text-[13px] md:text-sm lg:text-15px md:h-14 bg-brand-secondary text-brand-light px-4 md:px-4 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-opacity-90":
        variant === "primary",
      "h-8 text-[13px] md:text-sm lg:text-15px md:h-10 bg-brand-light text-skin-base border border-slate-600 px-3 md:px-4 lg:px-4 py-4 md:py-4 lg:py-4":
        variant === "border",
      "h-11 text-[13px] md:text-sm lg:text-15px md:h-[50px] bg-brand-secondary text-brand-light font-body px-4 lg:px-4 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-opacity-90 focus:bg-opacity-70":
        variant === "formButton",
      " bg-brand-secondary text-white px-3 md:px-4 lg:px-4 py-3 md:py-3 lg:py-3":
        variant === "small",
      "text-brand text-sm": variant === "smallSecondary",
      "cursor-not-allowed hover:cursor-not-allowed bg-opacity-50 hover:bg-opacity-50":
        disabled,
    },
    className
  );

  return (
    <button
      aria-pressed={active}
      data-variant={variant}
      ref={ref}
      className={rootClassName}
      disabled={disabled}
      {...rest}
    >
      {children}
      {loading && <ImSpinner2 className="animate-spin -me-1 ms-3 h-5 w-5 " />}
    </button>
  );
});

export default Button;

Button.displayName = "Button";
