"use client";

import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

function Mapclick({ setPickup, setDropoff }) {
  useMapEvents({
    async click(e) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );

        const data = await response.json();

        console.log("ADDRESS:", data.display_name);

        const location = {
          lat: lat,
          lng: lng,
          address: data.display_name,
        };

        console.log("Map clicked location:", location);

        setPickup(location);
      } catch (error) {
        console.log("Reverse geocoding error:", error);
      }
    },
  });

  return null;
}

export default function MapPicker({
  pickup,
  setPickup,
  dropoff,
  setDropoff,
}) {
  function LocationSearch({ type }) {
    const [value, setValue] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
      if (!value || value.length < 3) {
        setResults([]);
        return;
      }

      const searchLocation = async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              value
            )}&limit=5`
          );

          const data = await response.json();

          setResults(data);
        } catch (error) {
          console.log("Search error:", error);
        }
      };

      searchLocation();
    }, [value]);

    const handleSelectLocation = (location) => {
      const selectedLocation = {
        address: location.display_name,
        lat: Number(location.lat),
        lng: Number(location.lon),
      };

      console.log("Selected location:", selectedLocation);

      if (type === "pickup") {
        setPickup(selectedLocation);
      } else {
        setDropoff(selectedLocation);
      }

      setValue(location.display_name);
      setResults([]);
    };

    return (
      <div className="relative mb-3">
        <input
          type="text"
          placeholder={
            type === "pickup"
              ? "Search pickup location"
              : "Search dropoff location"
          }
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full border p-3 rounded"
        />

        {results.length > 0 && (
          <div className="absolute z-10 w-full bg-white border rounded">
            {results.map((location) => (
              <div
                key={location.place_id}
                onClick={() => handleSelectLocation(location)}
                className="p-3 cursor-pointer hover:bg-gray-100"
              >
                {location.display_name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Pickup Search */}
      <LocationSearch type="pickup" />

      {/* Dropoff Search */}
      <LocationSearch type="dropoff" />

      <MapContainer
        center={[30.9, 75.85]}
        zoom={10}
        style={{
          height: "500px",
          width: "50%",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Mapclick
          setPickup={setPickup}
          setDropoff={setDropoff}
        />

        {pickup && (
          <Marker
            position={[pickup.lat, pickup.lng]}
          />
        )}

        {dropoff && (
          <Marker
            position={[dropoff.lat, dropoff.lng]}
          />
        )}
      </MapContainer>
    </>
  );
}