if (import.meta.env.DEV) {
  await import("react-scan").then(({ scan }) => {
    scan({
      trackUnnecessaryRenders: true,
    });
  });
}

import { createRoot } from "react-dom/client";

import { App } from "./App";

createRoot(document.getElementById("root")!).render(<App />);
