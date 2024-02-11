import React, { useEffect, useState } from "react";

// react leaflet
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
  const [center, setCenter] = useState([42.1908, -91.7852]);
  // const [bbox, setBbox] = useState([-91.8852, 41.8908, -91.6852, 42.4908]);

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
      center={center}
      zoom={7}
      style={{ height: "400px" }}
      ref={setMap}
    >
      <MapClick />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {site && (
        <Marker position={[site.latitude, site.longitude]} icon={icon}>
          <Popup>{`${site.latitude}, ${site.longitude}`}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;
