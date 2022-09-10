import { TimelineMarker } from "@prisma/client";
import { useEffect, useState } from "react";
import { currentYear } from "../../../../services/distance";
import style from "./TimelineCard.module.css";

export const TimelineCard = ({ item }: { item: TimelineMarker }) => {
  const [showCard, setShowCard] = useState(true);
  const { title, content } = item;

  useEffect(() => {
    setShowCard(true);
  }, [item]);

  const parseDate = (date_day: number | null, date_month: string | null, date_year: number): string =>
    [date_day, date_month, date_year + currentYear].filter((el) => el !== null).join(" de ");

  return (
    <div
      id="timeline-card-container"
      className={style["timeline-card-container"]}
      style={!showCard ? { transform: "translateX(100vw)" } : {}}
    >
      <button className={style["timeline-card-close-button"]} onClick={() => setShowCard(false)}>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1000 1000"
          style={{ width: "14px", height: "14px" }}
        >
          <path
            fill="white"
            d="M638.6,500l322.7-322.7c38.3-38.3,38.3-100.3,0-138.6C923,0.4,861,0.4,822.7,38.7L500,361.4L177.3,38.7C139,0.4,77,0.4,38.7,38.7C0.4,77,0.4,139,38.7,177.3L361.4,500L38.7,822.7C0.4,861,0.4,923,38.7,961.3C57.9,980.4,82.9,990,108,990s50.1-9.6,69.3-28.7L500,638.6l322.7,322.7c19.1,19.1,44.2,28.7,69.3,28.7c25.1,0,50.1-9.6,69.3-28.7c38.3-38.3,38.3-100.3,0-138.6L638.6,500z"
          />
        </svg>
      </button>
      <h1 className={style["timeline-card-header"]}>{title}</h1>
      <div className={style["timeline-card-subtitle"]}>{parseDate(item.date_day, item.date_month, item.date_year)}</div>
      <div className={style["timeline-card-body"]} dangerouslySetInnerHTML={{ __html: content ?? "" }} />
    </div>
  );
};
