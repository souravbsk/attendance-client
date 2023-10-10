import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarked } from "react-icons/fa";

export default function LeafletMap({ center, zoom, markers, maxZoom }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  console.log("fsda");
  useEffect(() => {
    if (center && Array.isArray(center) && center.length === 2 && zoom) {
      if (!mapInstanceRef.current && mapRef.current) {
        const map = L.map(mapRef.current).setView(center, zoom);

        // Adjust the maximum zoom level here
        if (maxZoom) {
          map.setMaxZoom(maxZoom);
        }

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);
        mapInstanceRef.current = map;
      }

      if (markers && mapInstanceRef.current) {
        markers.forEach((marker) => {
          if (marker.latlng) {
            const customIcon = L.icon({
              iconUrl: "../../assets/marker.png", // Replace with the path to your marker icon image
              iconSize: [32, 32], // Set the width and height of your icon
              iconAnchor: [16, 32], // Set the anchor point of the icon
            });

            L.marker(marker.latlng, { icon: customIcon }).addTo(
              mapInstanceRef.current
            );
          }
        });
      }

      return () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      };
    }
  }, [center, zoom, markers, maxZoom]);

  return <div ref={mapRef} style={{ height: "300px" }} />;
}
