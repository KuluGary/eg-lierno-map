import { DataContext } from "components/DataProvider/DataProvider";
import { useContext } from "react";

export const useData = () => {
  const data = useContext(DataContext);

  return data;
};
