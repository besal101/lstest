import CloseButton from "@components/Element/CloseButton";
import Heading from "@components/Element/Heading";
import AddAddressFromMap from "@features/address/Delivery-address/add-address-map";
import AddressGrid from "@features/address/Delivery-address/address-grid";
import { LocationType } from "@features/address/addressSlice";
import { CloseModal } from "@features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import { useTranslation } from "next-i18next";
import { useEffect, useCallback, useState } from "react";

type ViewState = "address" | "map";

const DeliveryAddresses: React.FC = () => {
  const { t } = useTranslation("common");
  const [view, setView] = useState<ViewState>("map");
  const [location, setLocation] = useState<LocationType[]>([]);
  const { location: locationState } = useAppSelector((state) => state.location);

  useEffect(() => {
    if (locationState.length > 0) {
      setLocation(locationState);
      setView("address");
    }
  }, [locationState]);

  const dispatch = useAppDispatch();
  const close = useCallback(() => {
    dispatch(CloseModal());
  }, [dispatch]);

  const handlePopupView = (state: ViewState) => {
    setView(state);
  };

  const handleLocation = (location: LocationType[]) => {
    setLocation(location);
  };

  return (
    <div className="w-full md:w-[600px] lg:w-[900px] xl:w-[1000px] mx-auto bg-brand-light rounded-md py-6 md:py-10">
      <CloseButton onClick={close} />
      <div className="w-full">
        <Heading variant="title" className="mb-2 md:mb-8 -mt-1.5 px-5">
          {t("text-delivery-address")}
        </Heading>
        {view === "map" && (
          <AddAddressFromMap
            close={close}
            handlePopup={handlePopupView}
            handleLocation={handleLocation}
          />
        )}
        {view === "address" && (
          <AddressGrid handlePopup={handlePopupView} location={location} />
        )}
      </div>
    </div>
  );
};

export default DeliveryAddresses;
