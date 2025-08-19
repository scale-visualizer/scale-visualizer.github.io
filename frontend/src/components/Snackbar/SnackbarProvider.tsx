import { SnackbarProvider as Provider } from "notistack";

import { Snackbar } from "./Snackbar";

const Components = {
  default: Snackbar,
};

export const SnackbarProvider = () => {
  return <Provider autoHideDuration={null} Components={Components} />;
};
