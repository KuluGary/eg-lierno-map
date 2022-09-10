import { TimelinePositionParams, TimelineRangePositionParams } from "types";

export const currentYear = 1320;
const distanceMultiplier = 10;

export const getTimelineWidth = (bounds: number[]) => {
  const totalDistance = bounds[1] - bounds[0];

  return totalDistance * distanceMultiplier;
};

export const getTimelinePosition = ({ curr, next, bounds }: TimelinePositionParams) => {
  const totalDistance = bounds[1] - bounds[0];
  const [currentYear, nextYear] = [curr.date_year, next?.date_year];
  const parentWidth = getTimelineWidth(bounds);
  const minimumDistance = currentYear === nextYear ? 1 : 0;
  const basePosition = currentYear + Math.abs(bounds[0]) - minimumDistance;

  const position = (parentWidth * basePosition) / totalDistance + (nextYear ? 10 : 0);

  return { left: `${position}px` };
};

export const getRangePosition = ({ range, bounds }: TimelineRangePositionParams) => {
  const totalDistance = bounds[1] - bounds[0];
  const { start, end } = range.bounds;
  const parentWidth = getTimelineWidth(bounds);

  const getNormalizedPosition = (pos: number) => {
    const basePosition = pos + Math.abs(bounds[0]);
    const position = (parentWidth * basePosition) / totalDistance;

    return position;
  };

  const startAt = getNormalizedPosition(start ?? bounds[0]);
  const endAt = getNormalizedPosition(end ?? bounds[1]);

  return {
    left: `${startAt}px`,
    width: `${endAt - startAt}px`,
  };
};
