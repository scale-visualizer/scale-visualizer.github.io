import { Dashboard } from "../types";

import { downloadFile } from "./downloadFile";

export const downloadDashboardAsJson = ({
  dashboard,
  schemaVersion,
}: {
  dashboard: Dashboard;
  schemaVersion: number;
}) => {
  downloadFile({
    fileName: `${dashboard.name}.json`,
    content: JSON.stringify({
      dashboard,
      schemaVersion,
    }),
  });
};
