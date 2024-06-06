import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import data from "./DataArt.json"; // Importing data directly

const Map = () => {
  const [activeMarker, setActiveMarker] = useState(null); // State to manage active marker

  const handleMarkerClick = (marker) => {
    setActiveMarker(marker);
  };

  return (
    <MapContainer
      className="Ctn"
      center={[0, 0]} // Initial center (adjust as needed)
      zoom={2}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((entity) => (
        <Marker
          key={entity.Entity}
          position={[entity.Latitude || 0, entity.Longitude || 0]} // Handle missing coordinates
          onClick={() => handleMarkerClick(entity)}
        >
          <Popup>
            {entity.Entity}
            <br />
            Share of Global Plastics Emitted to Ocean:{" "}
            {entity["Share of global plastics emitted to ocean"]}% {/* Access the property correctly */}
          </Popup>
        </Marker>
      ))}
      {activeMarker && ( // Only render popup if a marker is active
        <Popup position={[activeMarker.Latitude || 0, activeMarker.Longitude || 0]}>
          {activeMarker.Entity}
          <br />
          Share of Global Plastics Emitted to Ocean:{" "}
          {activeMarker["Share of global plastics emitted to ocean"]}% {/* Access the property correctly */}
        </Popup>
      )}
    </MapContainer>
  );
};

export default Map;
