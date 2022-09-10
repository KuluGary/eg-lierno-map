import { useEffect, useRef } from "react";
import { getTimelinePosition } from "services/distance";
import { TimelineElementProps } from "types";
import style from "./TimelineMarker.module.css";

export const TimelineMarker = ({
  index,
  currElement,
  nextElement,
  isSelected,
  setSelectedItem,
  bounds,
}: TimelineElementProps) => {
  const elementRef: any = useRef(null);
  const handleClick = () => setSelectedItem(index);

  useEffect(() => {
    if (isSelected) elementRef?.current?.scrollIntoView({ behavior: "smooth", inline: "center" });
  }, [isSelected]);

  return (
    <div
      className={style["timeline-item"]}
      style={getTimelinePosition({
        curr: currElement,
        next: nextElement,
        bounds,
      })}
    >
      <div
        ref={elementRef}
        onClick={handleClick}
        className={style["timeline-marker"]}
        style={{ transform: `scale(${isSelected ? 1.5 : 1})`, transition: "transform 150ms linear" }}
      />
    </div>
  );
};
