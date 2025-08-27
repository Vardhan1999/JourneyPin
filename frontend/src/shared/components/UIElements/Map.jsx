import { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM.js";
import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import { Point } from "ol/geom";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Style, Icon } from "ol/style";

export default function OLMap({
  className,
  style,
  center = { lat: 18.5204, lng: 73.8567 }, // Pune
  zoom = 10,
}) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Convert lat/lng to OpenLayers projection
    const centerCoords = fromLonLat([center.lng, center.lat]);

    if (!mapInstance.current) {
      // Create marker feature
      const marker = new Feature({
        geometry: new Point(centerCoords),
      });

      marker.setStyle(
        new Style({
          image: new Icon({
            src: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // marker icon
            scale: 0.05,
          }),
        })
      );

      // Vector layer for markers
      const markerLayer = new VectorLayer({
        source: new VectorSource({
          features: [marker],
        }),
      });

      // Initialize map
      mapInstance.current = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          markerLayer,
        ],
        view: new View({
          center: centerCoords,
          zoom,
        }),
      });
    } else {
      // Update map view
      mapInstance.current.getView().setCenter(centerCoords);
      mapInstance.current.getView().setZoom(zoom);
    }
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${className || ""}`}
      style={{
        width: "100%",
        height: "260px",
        ...style,
      }}
    />
  );
}
