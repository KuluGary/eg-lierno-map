import { useEffect, useState } from "react";
import { TimelineFetchProps } from "types";

export default function useTimeline() {
  const [loading, setLoading] = useState(true);
  const [timeline, setTimeline] = useState<TimelineFetchProps | undefined>();
  const [error, setError] = useState();

  useEffect(() => {
    fetch("/api/timeline")
      .then((res) => res.json())
      .then(setTimeline)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { loading, timeline, error };
}
