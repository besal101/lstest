import { useTranslation } from "next-i18next";
import * as React from "react";
import { RiSearchLine } from "react-icons/ri";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

interface IPlacesAutoCompleteProps {
  onPlaceSelect: (
    lat: number,
    lng: number,
    address: string,
    terms: any
  ) => void;
}

const PlacesAutoComplete: React.FC<IPlacesAutoCompleteProps> = ({
  onPlaceSelect,
}) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const { t } = useTranslation("common");

  const handleSelect = async (address: any, terms: any) => {
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({ address });
    const { lat, lng } = getLatLng(results[0]);
    onPlaceSelect(lat, lng, address, terms);
  };
  return (
    <div className="absolute w-[calc(100%-2rem)]">
      <div className="relative bg-brand-lightOne flex flex-col">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="box-border border top-[10px] shadow-cart rounded-md text-sm absolute w-full ml-4 bg-brand-light h-[48px] px-4 py-4 mx-auto outline-none"
          placeholder={t("search-for-your-location") as string}
        />
        <div className="absolute top-6 -right-1">
          <RiSearchLine className="w-5 h-5" />
        </div>
      </div>

      {status === "OK" && (
        <div className="w-full h-[380px]">
          <div className="w-full absolute top-[58px] start-0 ml-4 py-0.5 border rounded-md flex bg-brand-light flex-col overflow-hidden shadow-dropDown z-30 cursor-pointer">
            {data.map(({ place_id, description, terms }) => (
              <div
                key={place_id}
                onClick={() => handleSelect(description, terms)}
                className="py-1 px-4 transition-colors duration-200 hover:bg-skin-two text-sm"
              >
                {description}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacesAutoComplete;
