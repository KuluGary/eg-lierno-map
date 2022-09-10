import useMap from "hooks/useMap";
import useTimeline from "hooks/useTimeline";
import { createContext } from "react";
import { DataContext as DataContextType } from "types";

export const DataContext = createContext<DataContextType>({});

export const DataProvider = ({ children }: { children: React.ReactNode | React.ReactFragment }) => {
  const { timeline } = useTimeline();
  const { map } = useMap();

  return <DataContext.Provider value={{ timeline, map }}>{children}</DataContext.Provider>;
};
