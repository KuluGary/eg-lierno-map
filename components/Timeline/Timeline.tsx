import { TimelineMarker as TimelineMarkerType, TimelineRange as TimelineRangeType } from "@prisma/client";
import { useData } from "hooks/useData";
import { useEffect, useRef, useState } from "react";
import { getTimelineWidth } from "services/distance";
import { TimelineCard } from "./components/TimelineCard/TimelineCard";
import { TimelineMarker } from "./components/TimelineMarker/TimelineMarker";
import { TimelineRange } from "./components/TimelineRange/TimelineRange";
import style from "./Timeline.module.css";

export const Timeline = () => {
  const { timeline } = useData();
  const timelineRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState<number>(
    (timeline?.markers?.findIndex((el: TimelineMarkerType) => el?.active) ?? 0) + 1
  );
  const bounds = [timeline?.markers[0].date_year, timeline?.markers[timeline?.markers.length - 1].date_year];

  useEffect(() => {
    if (!timeline) return;

    document.addEventListener("keydown", handleKeyPress, false);

    return () => document.removeEventListener("keydown", handleKeyPress, false);
  }, [timeline]);

  const handleKeyPress = (event: any) => {
    setSelectedItem((selectedItem) => {
      const [minBound, maxBound] = [0, timeline?.markers.length - 1];

      if (event.key === "ArrowLeft" && selectedItem - 1 >= minBound) {
        event.preventDefault();
        event.stopPropagation();

        return selectedItem - 1;
      }

      if (event.key === "ArrowRight" && selectedItem + 1 <= maxBound) {
        event.preventDefault();
        event.stopPropagation();

        return selectedItem + 1;
      }

      return selectedItem;
    });
  };

  return (
    <div id="timeline-container" className={style["timeline-container"]}>
      {timeline && <TimelineCard item={timeline?.markers[selectedItem]} />}
      <div
        ref={timelineRef}
        className={style["timeline-content-container"]}
        style={{ width: getTimelineWidth(bounds) ?? 0 }}
      >
        {timelineRef.current &&
          timeline?.markers?.map((item: TimelineMarkerType, i: number, arr: TimelineMarkerType[]) => (
            <TimelineMarker
              key={i}
              index={i}
              currElement={item}
              prevElement={arr[i - 1]}
              nextElement={arr[i + 1]}
              isSelected={selectedItem === i}
              setSelectedItem={setSelectedItem}
              bounds={bounds}
            />
          ))}
      </div>
      {timeline?.ranges?.map((range: TimelineRangeType, i: number) => (
        <div key={i} className={style["timeline-range-container"]}>
          {range.data?.map((element: any, i: number) => (
            <TimelineRange key={i} range={element} bounds={bounds} />
          ))}
        </div>
      ))}
    </div>
  );
};
