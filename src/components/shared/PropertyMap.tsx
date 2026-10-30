import { useEffect, useRef, useCallback } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Property } from "@/types";

interface PropertyMapProps {
  properties: Property[];
  maxBudget?: number;
  activeId?: string | null;
  onMarkerClick?: (id: string) => void;
}

function getMarkerColor(rent: number, maxBudget?: number): string {
  if (!maxBudget) return "#166534";
  const ratio = rent / maxBudget;
  if (ratio <= 0.85) return "#16a34a";
  if (ratio <= 1.0) return "#d97706";
  return "#dc2626";
}

function formatRentPill(rent: number): string {
  if (rent >= 100000) return `₹${(rent / 100000).toFixed(1)}L`;
  if (rent >= 1000) return `₹${Math.round(rent / 1000)}k`;
  return `₹${rent}`;
}

export function PropertyMap({ properties, maxBudget, activeId, onMarkerClick }: PropertyMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Map<string, { marker: maplibregl.Marker; el: HTMLDivElement }>>(new Map());

  const fitBounds = useCallback((map: maplibregl.Map, props: Property[]) => {
    if (props.length === 0) return;
    const bounds = new maplibregl.LngLatBounds();
    props.forEach((p) => bounds.extend([p.lng, p.lat]));
    map.fitBounds(bounds, { padding: 64, maxZoom: 14, duration: 600 });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const tileUrl = import.meta.env.VITE_MAPTILER_KEY
      ? `https://api.maptiler.com/maps/streets-v2/style.json?key=${import.meta.env.VITE_MAPTILER_KEY}`
      : "https://tiles.openfreemap.org/styles/liberty";

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: tileUrl,
      center: [72.8777, 19.076],
      zoom: 11,
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      "bottom-right"
    );

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const existingIds = new Set(markersRef.current.keys());
    const newIds = new Set(properties.map((p) => p.id));

    existingIds.forEach((id) => {
      if (!newIds.has(id)) {
        markersRef.current.get(id)?.marker.remove();
        markersRef.current.delete(id);
      }
    });

    properties.forEach((property) => {
      if (markersRef.current.has(property.id)) {
        const entry = markersRef.current.get(property.id)!;
        const color = getMarkerColor(property.rent, maxBudget);
        entry.el.style.backgroundColor = color;
        entry.el.style.borderColor = color;
        return;
      }

      const color = getMarkerColor(property.rent, maxBudget);
      const el = document.createElement("div");
      el.style.cssText = `
        background-color: ${color};
        border: 2px solid ${color};
        color: white;
        font-size: 11px;
        font-weight: 700;
        font-family: 'Plus Jakarta Sans', sans-serif;
        padding: 4px 8px;
        border-radius: 20px;
        white-space: nowrap;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.18);
        transition: transform 0.15s ease, box-shadow 0.15s ease;
        user-select: none;
      `;
      el.textContent = formatRentPill(property.rent);

      el.addEventListener("mouseenter", () => {
        el.style.transform = "scale(1.12)";
        el.style.boxShadow = "0 4px 16px rgba(0,0,0,0.28)";
        el.style.zIndex = "10";
      });
      el.addEventListener("mouseleave", () => {
        if (activeId !== property.id) {
          el.style.transform = "scale(1)";
          el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.18)";
          el.style.zIndex = "1";
        }
      });
      el.addEventListener("click", () => {
        onMarkerClick?.(property.id);
      });

      const marker = new maplibregl.Marker({ element: el, anchor: "center" })
        .setLngLat([property.lng, property.lat])
        .addTo(map);

      markersRef.current.set(property.id, { marker, el });
    });

    if (map.loaded()) {
      fitBounds(map, properties);
    } else {
      map.once("load", () => fitBounds(map, properties));
    }
  }, [properties, maxBudget, fitBounds, onMarkerClick, activeId]);

  useEffect(() => {
    markersRef.current.forEach(({ el }, id) => {
      if (id === activeId) {
        el.style.transform = "scale(1.2)";
        el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.35)";
        el.style.zIndex = "20";
        el.style.outline = "2px solid white";
      } else {
        el.style.transform = "scale(1)";
        el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.18)";
        el.style.zIndex = "1";
        el.style.outline = "none";
      }
    });
  }, [activeId]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[400px] maplibre-map rounded-xl"
      aria-label="Mumbai rental properties map"
      role="application"
    />
  );
}
