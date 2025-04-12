import { useContext } from "react";

import { DashboardContext } from "../contexts/DashboardContext";

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);

  if (context === undefined) {
    throw new Error("useDashboardContext must be used within a CountProvider");
  }
  return context;
};
