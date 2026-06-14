"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Next.js/Leaflet
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Map() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full bg-gray-100 dark:bg-dark-card animate-pulse" />;
  }

  // Auckland HQ coordinates (from previous iframe)
  const position: [number, number] = [-36.8863605, 174.5627566];

  return (
    <MapContainer 
      center={position} 
      zoom={11} 
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", zIndex: 10 }}
    >
      {/* CartoDB Dark Matter tile layer for a sleek dark mode look */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <Marker position={position}>
        <Popup>
          <div className="text-center font-sans text-gray-900">
            <strong>LIERON ENGINEERING LIMITED</strong><br/>
            Auckland, New Zealand
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
