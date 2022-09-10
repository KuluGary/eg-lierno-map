import { CRS, LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer } from "react-leaflet";
import { MapContent } from "./components/MapContent";
import style from "./Map.module.css";

const bounds: LatLngBoundsExpression = [
  [0, 0],
  [5145, 5145],
];

const Map = () => (
  <div id="map-container">
    <MapContainer
      id="map"
      crs={CRS.Simple}
      className={style["map-container"]}
      zoom={1}
      minZoom={-1}
      maxZoom={0}
      attributionControl={false}
      maxBounds={bounds}
      bounds={bounds}
      keyboard={false}
    >
      <MapContent bounds={bounds} />
    </MapContainer>
  </div>
);

export default Map;
