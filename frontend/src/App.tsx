import { StrictMode } from "react";

import { Settings } from "./components/Settings/Settings";
import { SnackbarProvider } from "./components/Snackbar/SnackbarProvider";
import { DashboardContextProvider } from "./contexts/DashboardContext";
import { MainPage } from "./pages/MainPage/MainPage";

export const App = () => {
  return (
    <StrictMode>
      <Settings>
        <SnackbarProvider />

        <DashboardContextProvider>
          <MainPage />
        </DashboardContextProvider>
      </Settings>
    </StrictMode>
  );
};
