import { MapLabel, MapMarker } from "@prisma/client";
import { useData } from "hooks/useData";
import {
  divIcon,
  imageOverlay,
  LatLngExpression,
  LatLngTuple,
  LayerGroup,
  marker as leafletMarker,
  svgOverlay,
} from "leaflet";
import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { MapProps } from "types";

let layers = new LayerGroup();

export const MapContent = ({ bounds }: MapProps) => {
  const { map: mapData } = useData();
  const map = useMap();

  useMapEvents({
    zoomstart: () => {
      layers.eachLayer((layer) => (layer as any)._icon.classList.toggle("small"));
    },
    click: (e) => console.log(Object.values(e.latlng)),
  });

  useEffect(() => {
    if (!mapData) return;

    map.fitBounds(bounds);
    imageOverlay("/images/map.jpg", bounds).addTo(map);

    (async () => {
      const { labels: labelsJSON, markers: markersJSON } = mapData;

      for (const label of labelsJSON as MapLabel[]) {
        const svg = await fetch(`/svg/labels/${label.id}.svg`).then((res) => res.text());
        const temp = document.createElement("div");
        temp.innerHTML = svg;
        const svgElement: any = temp.firstChild;

        const labelSvg = svgOverlay(
          svgElement,
          [
            label.position as LatLngTuple,
            [label.position[0] + svgElement.height.baseVal.value, label.position[1] + svgElement.width.baseVal.value],
          ],
          { className: `place-label ${label.id ?? ""}`, interactive: label.interactive }
        );

        labelSvg.addTo(map);
      }

      for (const marker of markersJSON as MapMarker[]) {
        const svg = await fetch(`/svg/markers/${marker.icon}.svg`).then((res) => res.text());

        const myIcon = divIcon({
          className: "place-marker small",
          html: `<div>${svg}</div>`,
          iconAnchor: [20, 20],
        });

        const newMarker = leafletMarker(marker.position as LatLngExpression, { icon: myIcon });

        layers.addLayer(newMarker);
        map.addLayer(layers);
      }
    })();
  }, [mapData]);

  return null;
};
