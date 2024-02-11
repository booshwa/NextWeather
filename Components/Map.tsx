import React, { useEffect, useState } from "react";

// react leaflet
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
// import { useMapEvent } from "react-leaflet/hooks";
import { randomPoint } from "@turf/random";
import pointGrid from "@turf/point-grid";
import isolines from "@turf/isolines";

const icon = L.icon({
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [13, 41],
});

const Map = ({ sites, setSites }) => {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState([42.1908, -91.7852]);
  const [bbox, setBbox] = useState([-91.8852, 41.8908, -91.6852, 42.4908]);
  // const [points, setPoints] = useState([]);

  // console.log({ map, center, sites });

  // useEffect(() => {
  //   // Generate 5 random points in bounding box
  //   let sample = randomPoint(5, { bbox });
  //   setPoints(sample);
  // }, [bbox]);

  // useEffect(() => {
  //   setSites(points);
  // }, [points]);

  // const genRandomPoints = () => {
  //   if (map) {
  //     // console.log({ bound: map.getBounds() });

  //     map.on("moveend", function () {
  //       const bounds = map.getBounds();
  //       setBbox([
  //         bounds._southWest.lng + 0.25,
  //         bounds._northEast.lat - 0.25,
  //         bounds._northEast.lng - 0.25,
  //         bounds._southWest.lat + 0.25,
  //       ]);
  //     });
  //   }
  // };

  const addPoint = (mapPoint) => {
    console.log({ mapPoint });
    // setSites({
    //   type: "FeatureCollection",
    //   features: [
    //     {
    //       type: "Feature",
    //       properties: {},
    //       geometry: {
    //         type: "Point",
    //         coordinates: [mapPoint.latlng.lng, mapPoint.latlng.lat],
    //       },
    //     },
    //   ],
    // });

    setSites([[mapPoint.latlng.lat, mapPoint.latlng.lng]]);
  };

  return (
    <MapContainer
      center={center}
      zoom={7}
      style={{ height: "400px" }}
      ref={setMap}
    >
      <MapClick addPoint={addPoint} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {sites.length > 0 &&
        sites.map((point, index) => {
          return (
            <Marker key={index} position={point} icon={icon}>
              <Popup>{`${point[0]}, ${point[1]}`}</Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
};

function MapClick({ addPoint }) {
  const map = useMapEvent("click", (e) => {
    // console.log(e);
    addPoint(e);
  });
  return null;
}

export default Map;
