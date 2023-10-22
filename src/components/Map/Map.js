"use client";
import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import "./Map.css";
import IconPoint from "@/assets/mapicon.png";

const Map = ({ position }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Your Leaflet code that uses the window object can go here
    }
  }, []);
  return (
    <div className="container overflow-hidden">
      <MapContainer center={position} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      ,
    </div>
  );
};

export default Map;
