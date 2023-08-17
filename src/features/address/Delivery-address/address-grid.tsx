import Button from "@components/Element/Button/Button";
import Input from "@components/Element/input";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { LocationState, LocationType } from "../addressSlice";
import { CloseModal } from "@features/modal/modalSlice";
import Map from "@libs/Map";
import "react-phone-number-input/style.css";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import { setLocation } from "../addressSlice";

type ViewState = "address" | "map";

interface AddressGridProps {
  handlePopup: (modalState: ViewState) => void;
  location: LocationType[];
}

const AddressGrid: React.FC<AddressGridProps> = ({ handlePopup, location }) => {
  const {
    apartment,
    fullname,
    location: loca,
    phone,
  } = useAppSelector((state) => state.location);
  const { t } = useTranslation();
  const [mapLocation, setMapLocation] = useState<LocationType[]>(location);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    clearErrors,
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const newData = {
      fullname: data.fullname,
      phone: data.phone,
      apartment: data.address,
      location: mapLocation,
    };
    dispatch(setLocation(newData));
    dispatch(CloseModal());
  };

  const handlePhoneChange = (phone: string) => {
    if (phone === undefined || phone === "") {
      setError("phone", {
        type: "invalid",
        message: t("forms:phone-required") as string,
      });
    } else if (!isValidPhoneNumber(phone)) {
      setError("phone", {
        type: "invalid",
        message: t("forms:invalid-phone") as string,
      });
    } else {
      clearErrors("phone");
      setValue("phone", phone);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-5 transition-all duration-100">
      <div className=" hidden lg:block  h-[500px]">
        <Map
          pointerposition={{
            lat: location[0].lat,
            lng: location[0].lng,
          }}
          infowindow
          location={location[0].address + ", " + location[0].state}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mx-2">
          <h4 className="text-xl font-bold pb-4">
            {t("forms:location-information")}
          </h4>
          <div className="flex flex-col w-full gap-2 py-3">
            <Input
              label={t("forms:full-name") as string}
              type="text"
              variant="solid"
              defaultValue={fullname}
              {...register("fullname", {
                required: `${t("forms:full-name-required")}`,
              })}
              error={errors.fullname?.message as string}
            />
          </div>
          <div className="flex flex-col w-full gap-2 py-3">
            <Input
              label={t("forms:label-address") as string}
              type="text"
              variant="solid"
              defaultValue={apartment}
              {...register("address", {
                required: `${t("forms:address-required")}`,
              })}
              placeholder={t("forms:apartment-address") as string}
              error={errors.address?.message as string}
            />
          </div>
          <div className="flex flex-col w-full gap-2 py-3">
            <label className="text-sm font-semibold text-slate-900">
              Mobile Number *
            </label>
            <PhoneInput
              international
              defaultCountry="AE"
              value={phone}
              {...register("phone", { required: true })}
              onChange={handlePhoneChange}
              className="appearance-none border border-gray-500 rounded-xl py-3.5 pl-4 pr-12"
            />
            {errors.phone && (
              <span className="text-red-500">Phone number is required</span>
            )}
          </div>
          <div className="flex w-full justify-end mt-auto gap-2">
            <Button
              className="h-11 md:h-12 mt-1.5"
              variant="border"
              onClick={() => handlePopup("map")}
            >
              {t("common:go-back")}
            </Button>
            <Button
              className="h-11 md:h-12 mt-1.5"
              variant="small"
              type="submit"
            >
              {t("common:confirm-location")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddressGrid;
