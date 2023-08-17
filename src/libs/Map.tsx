import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
import PlacesAutoComplete from "@features/address/Delivery-address/places-auto-complete";
import ContentLoader from "react-content-loader";

interface IPosition {
  lat: number;
  lng: number;
}

const libraries: (
  | "places"
  | "drawing"
  | "geometry"
  | "localContext"
  | "visualization"
)[] = ["places"];

interface MapProps {
  onAddressSelect?: (data: {
    address: string;
    terms: any;
    newPosition: IPosition;
  }) => void;
  autocomplete?: boolean;
  pointerposition: IPosition;
  infowindow?: boolean;
  location?: string;
}

const Map: React.FC<MapProps> = ({
  onAddressSelect,
  autocomplete,
  pointerposition,
  infowindow,
  location,
}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
    libraries: libraries,
  });

  const [selectedMarker, setSelectedMarker] = useState<any>();
  const [mapPosition, setMapPosition] = useState<IPosition | null>(null);
  const [infoWindowToggle, setInfoWindowToggle] = useState<boolean>(false);
  const [focusZoom, setFocusZoom] = useState<number>(15);

  const handlePlaceSelect = (
    lat: number,
    lng: number,
    address: string,
    terms: any
  ) => {
    const formatted_address = terms[0].value + ", " + terms[1].value;
    setSelectedMarker({ formatted_address, city: terms[2].value });
    const newPosition = { lat, lng };
    setMapPosition(newPosition);
    setInfoWindowToggle(true);
    setFocusZoom(18);
    if (!onAddressSelect) return;
    onAddressSelect({ address, terms, newPosition });
  };

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "520px" }}
        center={mapPosition || pointerposition}
        zoom={focusZoom}
        options={{
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {autocomplete && (
          <PlacesAutoComplete onPlaceSelect={handlePlaceSelect} />
        )}
        <MarkerF
          position={mapPosition ? mapPosition : pointerposition}
          visible={true}
          icon={"/pin.png"}
        >
          {infowindow && (
            <InfoWindow
              position={pointerposition}
              onCloseClick={() => setInfoWindowToggle(false)}
            >
              <div className="flex flex-col w-24 py-2">
                <p className="text-xs font-medium">{location}</p>
              </div>
            </InfoWindow>
          )}

          {infoWindowToggle && (
            <InfoWindow
              position={pointerposition}
              onCloseClick={() => setInfoWindowToggle(false)}
            >
              <div className="flex flex-col w-28 py-2">
                <h3 className="text-sm font-medium">{selectedMarker?.city}</h3>
                <p className="text-xs">{selectedMarker?.formatted_address}</p>
              </div>
            </InfoWindow>
          )}
        </MarkerF>
      </GoogleMap>
    </>
  ) : (
    <ContentLoader
      speed={2}
      width={226}
      height={320}
      viewBox="0 0 226 320"
      backgroundColor="#F3F6FA"
      foregroundColor="#E7ECF3"
      className="w-full h-auto shadow-card rounded-md overflow-hidden"
    >
      <rect x="0" y="0" rx="0" ry="0" width="226" height="185" />
      <rect x="18" y="203" rx="3" ry="3" width="79" height="8" />
      <rect x="18" y="236" rx="3" ry="3" width="195" height="5" />
      <rect x="18" y="258" rx="3" ry="3" width="100" height="5" />
      <rect x="18" y="287" rx="3" ry="3" width="79" height="5" />
    </ContentLoader>
  );
};

export default React.memo(Map);
