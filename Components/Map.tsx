import React, { useEffect, useState } from "react";

// Leaflet
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";

const icon = L.icon({
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [13, 41],
});

const Map = ({ site, setSite, clear }) => {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState([39.8283, -98.5795]);

  const MapClick = () => {
    useMapEvent("click", (e) => {
      clear();

      map.flyTo(e.latlng);
      setSite({ latitude: e.latlng.lat, longitude: e.latlng.lng });
    });
    return null;
  };

  return (
    <MapContainer
      //@ts-ignore
      center={center}
      zoom={5}
      id="map"
      // style={{ position: "absolute", top: "0px", bottom: "0px", width: "100%" }}
      // style={{ height: "500px" }}
      ref={setMap}
    >
      <MapClick />
      <TileLayer
        //@ts-ignore
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {site && (
        //@ts-ignore
        <Marker position={[site.latitude, site.longitude]} icon={icon}>
          <Popup>{`${site.latitude}, ${site.longitude}`}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;
