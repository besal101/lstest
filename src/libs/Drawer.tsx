import { setOpenDrawer } from "@features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";
import { useCallback } from "react";
import dynamic from "next/dynamic";
const Cart = dynamic(() => import("@features/cart/CartSidebar/CartSidebar"));

interface IRCDrawerProps {
  direction: string;
}

const RCDrawer: React.FC<IRCDrawerProps> = ({ direction }) => {
  const openDrawer = useAppSelector((state) => state.theme.openDrawer);
  const dispatch = useAppDispatch();

  const closeDrawer = useCallback(
    () => dispatch(setOpenDrawer(false)),
    [dispatch]
  );

  const contentWrapperCSS = direction === "ltr" ? { right: 0 } : { left: 0 };

  return (
    <Drawer
      open={openDrawer}
      placement={direction === "ltr" ? "right" : "left"}
      onClose={closeDrawer}
      handler={false}
      showMask={true}
      level={null}
      contentWrapperStyle={contentWrapperCSS}
    >
      {openDrawer && <Cart />}
    </Drawer>
  );
};

export default RCDrawer;
