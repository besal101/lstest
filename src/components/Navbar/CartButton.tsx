"use client";
import cn from "classnames";
import { HiShoppingCart } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import { setOpenDrawer } from "@features/theme/themeSlice";
import { CartIcon } from "@components/icons/CartButton";

type CartButtonProps = {
  className?: string;
  iconClassName?: string;
  isShowing?: boolean;
};

const CartButton: React.FC<CartButtonProps> = ({
  className,
  iconClassName = "h-6 w-6 me-2",
}) => {
  const dispatch = useAppDispatch();
  const openDrawer = useAppSelector((state) => state.theme.openDrawer);
  const cart = useAppSelector((state) => state.cart.cartItems);

  const handleDrawerToggle = () => {
    dispatch(setOpenDrawer(!openDrawer));
  };

  return (
    <button
      className={cn(
        "flex items-center justify-center flex-shrink-0 h-auto focus:outline-none transform",
        className
      )}
      onClick={handleDrawerToggle}
      aria-label="cart-button"
    >
      <div className="flex items-center relative">
        <CartIcon className={cn(iconClassName)} color="#0F172A" />
        {cart.length > 0 && (
          <span className="cart-counter-badge flex items-center justify-center bg-brand text-white absolute -top-2.5 start-2.5 rounded-full font-bold">
            {cart.length}
          </span>
        )}
      </div>
      <span className="lg:text-20px text-black text-base font-medium hidden lg:flex">
        Cart
      </span>
    </button>
  );
};

export default CartButton;
