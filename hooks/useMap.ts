import { useEffect, useState } from "react";
import { MapFetchProps } from "types";

export default function useMap() {
  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState<MapFetchProps | undefined>();
  const [error, setError] = useState();

  useEffect(() => {
    fetch("/api/map")
      .then((res) => res.json())
      .then(setMap)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { loading, map, error };
}
