import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";
import { useCallback } from "react";
import dynamic from "next/dynamic";
const Filter = dynamic(() => import("@features/filter/FilterSidebar"));
import { setMobileFilter } from "@features/theme/themeSlice";

interface IFilterDrawerProps {
  direction: string;
}

const FilterDrawer: React.FC<IFilterDrawerProps> = ({ direction }) => {
  const openDrawer = useAppSelector((state) => state.theme.displayMobileFilter);
  const dispatch = useAppDispatch();

  const closeDrawer = useCallback(
    () => dispatch(setMobileFilter(false)),
    [dispatch]
  );

  const contentWrapperCSS = direction === "ltr" ? { left: 0 } : { right: 0 };

  return (
    <Drawer
      open={openDrawer}
      placement={direction === "ltr" ? "left" : "right"}
      onClose={closeDrawer}
      handler={false}
      showMask={true}
      level={null}
      contentWrapperStyle={contentWrapperCSS}
    >
      {openDrawer && <Filter />}
    </Drawer>
  );
};

export default FilterDrawer;
