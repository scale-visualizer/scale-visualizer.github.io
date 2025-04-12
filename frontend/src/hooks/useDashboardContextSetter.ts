import { useContext } from "react";

import { DashboardContextSetter } from "../contexts/DashboardContext";

export const useDashboardContextSetter = () => {
  const context = useContext(DashboardContextSetter);

  if (context === undefined) {
    throw new Error(
      "useDashboardContextSetter must be used within a CountProvider",
    );
  }
  return context;
};
