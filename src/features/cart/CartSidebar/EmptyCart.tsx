import Image from "next/image";
import EmptycartImage from "@assets/empty-cart.png";
import Link from "next/link";

interface IEmptyCartProps {
  returnToHome?: boolean;
}

const EmptyCart: React.FC<IEmptyCartProps> = ({ returnToHome }) => {
  return (
    <div className="px-5 md:px-7 pt-8 pb-5 flex justify-center flex-col items-center">
      <div className="flex mx-auto w-[220px] md:w-auto">
        <Image
          src={EmptycartImage}
          alt=" Empty Cart"
          width={270}
          height={240}
        />
      </div>
      <h3 className="mb-1.5 pt-8 font-semibold text-black text-xl">
        Your Shopping Cart is Empty
      </h3>
      <p className="text-gray text-sm leading-7">
        Please add product to your cart list
      </p>
      {returnToHome && (
        <Link
          className="mt-5 text-sm text-white bg-black px-5 py-2 rounded-md"
          href="/"
        >
          Return to Home
        </Link>
      )}
    </div>
  );
};

export default EmptyCart;
