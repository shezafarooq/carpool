import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import SearchControl from "./SearchControl";
import html2canvas from "html2canvas";
import "./css/map.css";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

import { useMap } from "react-leaflet";

const SnapshotButton = () => {
  const map = useMap();

  const takeSnapshot = () => {
    html2canvas(map.getContainer()).then(function (canvas) {
      canvas.toBlob(function (blob) {
        let url = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "map-snapshot.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    });
  };

  return (
    <button
      className="Take-snap"
      onClick={takeSnapshot}
      style={{
        background: "#fb8500",
        padding: "10px",
        borderRadius: "10px",
        color: "#023047",
        marginRight: "50px",
        marginTop: "20px",
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 1000,
      }}
    >
      Take Snapshot
    </button>
  );
};

export default function Map() {
  const [position, setPosition] = useState([24.8422, 67.0516]);
  const markerRef = useRef(null);
  const _created = (e) => console.log(e);
  const handleLocationSelect = (location) => {
    reverseGeocode(location, 1, "en", "pk", (result) => {
      const locationName = result[0].properties.display_name;
      setMarkerPositions((prevMarkerPositions) => [
        ...prevMarkerPositions,
        { location, locationName },
      ]);
    });
  };

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.dragging.enable();
    }
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MapContainer
        style={{ height: "75vh", width: "75%", marginBottom: "300px" }}
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        closePopupOnClick={false}
      >
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={(e) => {
              const lat = e.layer.getLatLng().lat;
              const lon = e.layer.getLatLng().lng;
              axios
                .get(
                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
                )
                .then((response) => {
                  const locationName = response.data.display_name;
                  e.layer
                    .bindPopup(locationName, { autoClose: false })
                    .openPopup();
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
            draw={{
              rectangle: false,
              circle: false,
              polygon: false,
              circlemarker: false,
            }}
          />
        </FeatureGroup>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SearchControl onLocationSelect={handleLocationSelect} />
        <SnapshotButton />
      </MapContainer>
    </div>
  );
}
