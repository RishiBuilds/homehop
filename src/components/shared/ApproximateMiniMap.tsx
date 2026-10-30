import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapPin, ShieldCheck } from "lucide-react";
import type { Property } from "@/types";

interface ApproximateMiniMapProps {
  property: Property;
}

export function ApproximateMiniMap({ property }: ApproximateMiniMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tileUrl = import.meta.env.VITE_MAPTILER_KEY
      ? `https://api.maptiler.com/maps/streets-v2/style.json?key=${import.meta.env.VITE_MAPTILER_KEY}`
      : "https://tiles.openfreemap.org/styles/liberty";

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: tileUrl,
      center: [property.lng, property.lat],
      zoom: 14,
      attributionControl: false,
      interactive: true,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    const markerEl = document.createElement("div");
    markerEl.className = "approx-marker-pin";
    markerEl.style.cssText = `
      background-color: rgba(22, 101, 52, 0.2);
      border: 2px dashed #166534;
      border-radius: 9999px;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    const innerDot = document.createElement("div");
    innerDot.style.cssText = `
      background-color: #166534;
      border: 2px solid white;
      border-radius: 9999px;
      width: 14px;
      height: 14px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.25);
    `;
    markerEl.appendChild(innerDot);

    new maplibregl.Marker({ element: markerEl, anchor: "center" })
      .setLngLat([property.lng, property.lat])
      .addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [property.lat, property.lng]);

  return (
    <div className="rounded-xl border bg-card overflow-hidden shadow-xs">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Approximate Locality Map</h3>
        </div>
        <span className="text-[10px] text-muted-foreground flex items-center gap-1 bg-muted px-2 py-0.5 rounded font-medium">
          <ShieldCheck className="h-3 w-3 text-primary" />
          Approximate area only — no exact flat address
        </span>
      </div>
      <div
        ref={containerRef}
        className="w-full h-56 maplibre-map"
        aria-label={`Approximate map of ${property.locality}`}
      />
      <div className="p-3 bg-muted/30 text-[11px] text-muted-foreground flex items-center justify-between">
        <span>Near {property.nearbyStation} Station ({property.locality})</span>
        <span className="text-primary font-medium">Within walking / auto radius</span>
      </div>
    </div>
  );
}
