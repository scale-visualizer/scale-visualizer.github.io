import { enUS } from "@mui/material/locale";
import { createTheme } from "@mui/material/styles";

export const darkThemeMatcher = window.matchMedia(
  "(prefers-color-scheme: dark)",
);

export const getThemeName = (matches: MediaQueryList["matches"]) => {
  return matches ? "dark" : "light";
};

const sizesReset = {
  width: "100%",
  height: "100%",
  padding: 0,
  margin: 0,
};

export const theme = createTheme(
  {
    colorSchemes: {
      dark: darkThemeMatcher.matches,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: sizesReset,
          body: sizesReset,
        },
      },
    },
  },
  enUS,
);
