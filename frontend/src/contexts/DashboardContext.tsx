import { createContext, useState } from "react";

import { Dashboard } from "../types";
import { initialData } from "../utils/initialData";

export const DashboardContext = createContext<Dashboard | undefined>(undefined);

export const DashboardContextSetter = createContext<
  React.Dispatch<React.SetStateAction<Dashboard>> | undefined
>(undefined);

export const DashboardContextProvider = (props: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<Dashboard>(
    initialData.dashboards[initialData.currentDashboard],
  );

  return (
    <DashboardContextSetter.Provider value={setState}>
      <DashboardContext.Provider value={state}>
        {props.children}
      </DashboardContext.Provider>
    </DashboardContextSetter.Provider>
  );
};
