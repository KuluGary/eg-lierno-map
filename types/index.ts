import { MapLabel, MapMarker, TimelineMarker, TimelineRange } from "@prisma/client";
import { LatLngBoundsExpression } from "leaflet";

export type TimelineItemDate = {
  year: number;
  month?: string;
  day?: string | number;
};

export type TimelineElementProps = {
  index: number;
  currElement: TimelineMarker;
  nextElement: TimelineMarker;
  prevElement: TimelineMarker;
  isSelected: Boolean;
  setSelectedItem: Function;
  bounds: number[];
};

export type TimelinePositionParams = {
  curr: TimelineMarker;
  next: TimelineMarker;
  parent?: HTMLElement | null;
  bounds: number[];
};

export type TimelineRangePositionParams = {
  range: {
    bounds: TimelineBounds;
  };
  bounds: number[];
};

export type MapProps = {
  bounds: LatLngBoundsExpression;
};

export type TimelineFetchProps = {
  ranges: any;
  markers: any;
};

export type MapFetchProps = {
  labels: MapLabel[];
  markers: MapMarker[];
};

export type TimelineBounds = {
  start: number;
  end: number;
};

export type DataContext = {
  timeline?: TimelineFetchProps;
  map?: MapFetchProps;
};
