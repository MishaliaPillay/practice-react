import React, { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "./Map.css";
import data from "./DataArt.json";

const Map = () => {
  const [filter, setFilter] = useState(""); // State for filter

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const getMarkerColor = (share) => {
    if (share >= 20) {
      return "red"; // Red for high percentage
    } else if (share >= 5) {
      return "orange"; // Orange for medium percentage
    } else {
      return "blue"; // Blue for low percentage
    }
  };

  const filteredData = () => {
    if (filter === "countries") {
      // Filter data for countries excluding the 7 continents
      return data.filter(
        (entity) =>
          ![
            "Africa",
            "Asia",
            "Europe",
            "North America",
            "South America",
            "Australia",
            "Antarctica",
          ].includes(entity.Entity)
      );
    } else if (filter === "continents") {
      // Filter data for only the 7 continents
      return data.filter((entity) =>
        [
          "Africa",
          "Asia",
          "Europe",
          "North America",
          "South America",
          "Australia",
          "Antarctica",
        ].includes(entity.Entity)
      );
    } else {
      // Show all data
      return data;
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => handleFilterChange("countries")}>
          Countries
        </button>
        <button onClick={() => handleFilterChange("continents")}>
          Continents
        </button>
        <button onClick={() => handleFilterChange("")}>All</button>
      </div>
      <MapContainer
        className="Ctn"
        center={[0, 0]}
        zoom={2}
        scrollWheelZoom={false}
        maxBounds={[
          [-90, -180], // Southwest
          [90, 180],   // Northeast
        ]}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredData().map((entity, index) => (
          <CircleMarker
            key={index}
            center={[entity.Latitude, entity.Longitude]}
            radius={6}
            fillColor={getMarkerColor(
              entity["Share of global plastics emitted to ocean"]
            )}
            color={getMarkerColor(
              entity["Share of global plastics emitted to ocean"]
            )}
            fillOpacity={0.5}
          >
            <Popup>
              {entity.Entity}
              <br />
              Share of Global Plastics Emitted to Ocean:{" "}
              {entity["Share of global plastics emitted to ocean"]}%
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
