import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import logo from "@assets/logo.png";
import { MobileLogo } from "@components/icons/Logo";

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  href = "/",
  ...props
}) => {
  return (
    <Link
      href={href}
      className={cn("inline-flex focus:outline-none", className)}
      {...props}
    >
      <Image
        src={logo}
        alt={"Lifesmile"}
        height={90}
        width={90}
        loading="eager"
        className="hidden sm:block md:block lg:block xl:block"
      />
      <div className="sm:hidden md:hidden lg:hidden xl:hidden rtl:mr-2 py-4 -ml-16">
        <MobileLogo className="w-28 h-7 ml-2 rtl:mr-2" />
      </div>
    </Link>
  );
};

export default Logo;
