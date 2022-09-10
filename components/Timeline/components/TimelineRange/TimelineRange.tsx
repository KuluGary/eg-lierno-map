import { useEffect, useMemo, useState } from "react";
import { TimelineBounds } from "types";
import { getRangePosition } from "services/distance";
import style from "./TimelineRange.module.css";

export const TimelineRange = ({ range, bounds }: any) => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    const areOverlapping = (range: TimelineBounds, bounds: TimelineBounds) => {
      if (bounds.start < range.start) {
        return bounds.end > range.start;
      } else {
        return bounds.start < range.end;
      }
    };

    const showRange = areOverlapping(range.bounds, { start: bounds[0], end: bounds[1] });

    setIsShowing(showRange);
  }, []);

  const pos = useMemo(() => getRangePosition({ range, bounds }), []);

  return (
    <div
      style={{
        marginLeft: "1px",
        ...pos,
        display: isShowing ? "block" : "none",
      }}
      className={style["timeline-range"]}
    >
      <label className={style["timeline-range-label"]}>{range?.name}</label>
    </div>
  );
};
