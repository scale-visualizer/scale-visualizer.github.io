import createTheme from "@mui/material/styles/createTheme";

const sizesReset = {
  width: "100%",
  height: "100%",
  padding: 0,
  margin: 0,
};

export const theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: sizesReset,
        body: sizesReset,
        "#root": sizesReset,
      },
    },
  },
});
