import { setOrderDrawer } from "@features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";
import { useCallback } from "react";
import dynamic from "next/dynamic";
const OrderDrawerComponent = dynamic(
  () => import("@features/Order/OrderDrawer")
);

interface IOrderDrawerProps {
  direction: string;
}

const OrderDrawer: React.FC<IOrderDrawerProps> = ({ direction }) => {
  const openDrawer = useAppSelector((state) => state.theme.orderDrawer.open);
  const dispatch = useAppDispatch();

  const closeDrawer = useCallback(
    () => dispatch(setOrderDrawer({ open: false, order: [] })),
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
      {openDrawer && <OrderDrawerComponent />}
    </Drawer>
  );
};

export default OrderDrawer;
