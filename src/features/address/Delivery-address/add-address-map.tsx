import Button from "@components/Element/Button/Button";
import Map from "@libs/Map";
import { useTranslation } from "next-i18next";
import useWindowSize from "@utils/useWindowSize";
import { useCallback, useState } from "react";
import { LocationType } from "../addressSlice";
import { useAppDispatch } from "@hooks/useRedux";
import { setLocation } from "../addressSlice";

type ViewState = "address" | "map";

interface IPosition {
  lat: number;
  lng: number;
}

interface MapProps {
  close: () => void;
  handlePopup: (modalState: ViewState) => void;
  handleLocation: (location: LocationType[]) => void;
}

const AddAddressFromMap: React.FC<MapProps> = ({
  close,
  handlePopup,
  handleLocation,
}) => {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const [address, setAddress] = useState<LocationType[]>([]);

  const handleAddressSelect = (data: {
    address: string;
    terms: any;
    newPosition: IPosition;
  }) => {
    const { terms, newPosition } = data;
    const locationArray: LocationType[] = [
      {
        country: terms[terms.length - 1].value,
        state: terms[terms.length - 2].value,
        address:
          `${terms[terms.length - 3]?.value} ${
            terms[terms.length - 4]?.value ? terms[terms.length - 4].value : ""
          }` || "",
        lat: newPosition.lat,
        lng: newPosition.lng,
      },
    ];
    setAddress(locationArray);
  };

  const handleAddress = useCallback(() => {
    handlePopup("address");
    handleLocation(address);
  }, [address, handleLocation, handlePopup]);

  return (
    <div>
      <Map
        onAddressSelect={handleAddressSelect}
        autocomplete
        pointerposition={{
          lat: 25.276987,
          lng: 55.296249,
        }}
      />

      {width! < 768 ? (
        <div className="px-4 mt-2">
          <button
            className="w-full bg-brand-secondary h-full text-white text-lg py-2 rounded-md"
            onClick={handleAddress}
          >
            {t("common:confirm-location")}
          </button>
        </div>
      ) : (
        <div className="flex w-full justify-end p-5 sm:px-4 sm:pb-3.5 gap-2">
          <Button
            className="h-11 md:h-12 mt-1.5"
            variant="border"
            type="button"
            onClick={close}
          >
            {t("common:go-back")}
          </Button>

          <Button
            className="h-11 md:h-12 mt-1.5"
            variant="small"
            type="button"
            onClick={handleAddress}
            disabled={address.length === 0}
          >
            {t("common:confirm-location")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddAddressFromMap;
