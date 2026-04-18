import { clearStack, context, connectLogger } from "@reatom/core";
import { reatomContext } from "@reatom/react";
import { createRoot } from "react-dom/client";

import { StrictMode } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { MainPage } from "./pages/MainPage/MainPage";
import { darkThemeMatcher, getThemeName, theme } from "./theme";

const mountApp = async () => {
  clearStack();

  const rootFrame = context.start();

  if (import.meta.env.DEV) {
    await import("react-scan").then(({ scan }) => {
      scan({
        trackUnnecessaryRenders: true,
      });
    });

    rootFrame.run(connectLogger);
  }

  createRoot(document.body).render(
    <StrictMode>
      <reatomContext.Provider value={rootFrame}>
        <ThemeProvider
          theme={theme}
          storageManager={null}
          noSsr
          defaultMode={getThemeName(darkThemeMatcher.matches)}
        >
          <CssBaseline />

          <MainPage />
        </ThemeProvider>
      </reatomContext.Provider>
    </StrictMode>,
  );
};

mountApp();
