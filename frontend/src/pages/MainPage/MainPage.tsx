import { enqueueSnackbar, closeSnackbar } from "notistack";

import { useCallback, useEffect, useMemo, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import UndoIcon from "@mui/icons-material/Undo";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

import styled from "@emotion/styled";

import { Dashboard as DashboardComponent } from "../../components/Dashboard/Dashboard";
import { DashboardNamePicker } from "../../components/DashboardNamePicker/DashboardNamePicker";
import { Dialog } from "../../components/Dialog/Dialog";
import { DialogChoices } from "../../components/Dialog/DialogChoices";
import { useDialog } from "../../components/Dialog/useDialog";
import { ImportExportButton } from "../../components/ImportExportButton/ImportExportButton";
import { Layout } from "../../components/Layout/Layout";
import { useBoolean } from "../../hooks/useBoolean";
import { usePureCallback } from "../../hooks/usePureCallback";
import { t9n } from "../../t9n/t9n";
import { theme } from "../../theme";
import { Dashboard } from "../../types";
import { areObjectsEqual } from "../../utils/areObjectsEqual";
import { downloadDashboardAsJson } from "../../utils/downloadDashboardAsJson";
import { initialData } from "../../utils/initialData";

const Controls = styled("div")`
  display: grid;
  grid: auto / auto-flow;
  justify-content: start;
  gap: 0 ${theme.spacing(1)};
`;

export const MainPage = () => {
  const [appData, setAppData] = useState(initialData);

  useEffect(() => {
    console.log(JSON.stringify(appData));
  }, [appData]);

  const dashboardOptions = useMemo(() => {
    return appData.dashboards.map((_, index) => {
      return index;
    });
  }, [appData]);

  const [selectedDashboardIndex, setSelectedDashboardIndex] = useState(
    appData.currentDashboard,
  );

  const [currentDashboard, setCurrentDashboard] = useState<Dashboard>(
    appData.dashboards[selectedDashboardIndex],
  );

  const isDashboardSaved = useMemo(() => {
    return areObjectsEqual(
      currentDashboard,
      appData.dashboards[selectedDashboardIndex],
    );
  }, [currentDashboard, selectedDashboardIndex, appData]);

  const { getChoice: getDialogChoice, ...dialog } = useDialog();

  const storeCurrentDashboardToAppData = useCallback(() => {
    setAppData((currentAppData) => {
      return {
        ...currentAppData,
        dashboards: currentAppData.dashboards.map((dashboard, index) => {
          return index === selectedDashboardIndex
            ? currentDashboard
            : dashboard;
        }),
      };
    });
  }, [currentDashboard, selectedDashboardIndex]);

  const onDashboardChange = usePureCallback<
    [Array<Dashboard>, boolean, () => void],
    [number],
    void
  >(
    [appData.dashboards, isDashboardSaved, storeCurrentDashboardToAppData],
    async (
      [dashboards, isDashboardSaved, storeCurrentDashboardToAppData],
      nextDashBoardIndex,
    ) => {
      if (isDashboardSaved) {
        storeCurrentDashboardToAppData();
      } else {
        const choice = await getDialogChoice({
          title: t9n.dashboardSwitchDialog.title,
          question: t9n.dashboardSwitchDialog.question,
          agreeText: t9n.dashboardSwitchDialog.agree,
          declineText: t9n.dashboardSwitchDialog.decline,
        });

        if (choice === DialogChoices.Cancel) {
          return;
        }

        if (choice === DialogChoices.Agree) {
          storeCurrentDashboardToAppData();
        }
      }

      setCurrentDashboard(dashboards[nextDashBoardIndex]);

      setSelectedDashboardIndex(nextDashBoardIndex);
    },
  );

  const editDashboardNameState = useBoolean();

  return (
    <Layout
      CustomHeaderControls={
        <Controls>
          {editDashboardNameState[0] ? (
            <DashboardNamePicker
              value={currentDashboard.name}
              onCancel={editDashboardNameState[1].current.setFalse}
              onSave={(newName) => {
                editDashboardNameState[1].current.setFalse();

                setCurrentDashboard((state) => {
                  return {
                    ...state,
                    name: newName,
                  };
                });

                // important to apply this change only via appData, because currentDashboard
                // can also have changes in widgets, that shouldn't save on name changing
                setAppData((currentAppData) => {
                  return {
                    ...currentAppData,
                    dashboards: currentAppData.dashboards.map(
                      (dashboard, index) => {
                        return index === selectedDashboardIndex
                          ? {
                              ...dashboard,
                              name: newName,
                            }
                          : dashboard;
                      },
                    ),
                  };
                });
              }}
            />
          ) : (
            <Autocomplete
              size="small"
              disablePortal
              options={dashboardOptions}
              value={selectedDashboardIndex}
              getOptionLabel={() => {
                return currentDashboard.name;
              }}
              onChange={(_, newValue) => {
                if (newValue === null) {
                  return;
                }

                onDashboardChange(newValue);
              }}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} />}
              renderOption={(props, option) => {
                return (
                  <Box {...props} key={props.key} component="li">
                    {appData.dashboards[option].name}
                  </Box>
                );
              }}
            />
          )}
          <IconButton
            title={t9n.headerControls.rename}
            onClick={editDashboardNameState[1].current.setTrue}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            disabled={isDashboardSaved}
            title="Save changes"
            onClick={storeCurrentDashboardToAppData}
          >
            <SaveOutlinedIcon />
          </IconButton>
          <IconButton
            disabled={isDashboardSaved}
            title={t9n.headerControls.revert}
            onClick={() => {
              setCurrentDashboard(appData.dashboards[selectedDashboardIndex]);
            }}
          >
            <UndoIcon />
          </IconButton>
          <IconButton
            title={t9n.headerControls.delete}
            disabled={editDashboardNameState[0]}
            onClick={async () => {
              const choice = await getDialogChoice({
                title: t9n.dashboardDeleteDialog.title(currentDashboard.name),
                question: t9n.dashboardDeleteDialog.question,
                agreeText: t9n.dashboardDeleteDialog.agree,
                declineText: t9n.dashboardDeleteDialog.decline,
              });

              if (choice === DialogChoices.Agree) {
                setAppData((currentAppData) => {
                  const newDashboards = currentAppData.dashboards.filter(
                    (_, index) => index !== selectedDashboardIndex,
                  );

                  if (newDashboards.length) {
                    setCurrentDashboard(newDashboards[0]);
                    setSelectedDashboardIndex(0);

                    return {
                      ...currentAppData,
                      dashboards: newDashboards,
                    };
                  } else {
                    const defaultDashboard = {
                      id: 0,
                      name: "New dashboard",
                      widgets: [],
                    };

                    setCurrentDashboard(defaultDashboard);
                    setSelectedDashboardIndex(0);

                    return {
                      ...currentAppData,
                      dashboards: [defaultDashboard],
                    };
                  }
                });
              }
            }}
          >
            <DeleteOutlineIcon />
          </IconButton>
          <IconButton
            title={t9n.headerControls.copy}
            disabled={editDashboardNameState[0]}
            onClick={() => {
              setAppData((currentAppData) => {
                const ids = currentAppData.dashboards
                  .map((dashboard) => dashboard.id)
                  .sort((a, b) => b - a);

                const newId = ids[0] + 1;

                const newDashboard = {
                  ...currentDashboard,
                  id: newId,
                  name: t9n.copiedDashbordName(currentDashboard.name),
                };

                enqueueSnackbar({
                  message: t9n.copiedDashboardSnackbar.message,
                  variant: "default",
                  action: (key) => {
                    return (
                      <Button
                        color="primary"
                        size="small"
                        onClick={() => {
                          setCurrentDashboard(newDashboard);
                          setSelectedDashboardIndex(ids.length);
                          closeSnackbar(key);
                        }}
                      >
                        {t9n.copiedDashboardSnackbar.action}
                      </Button>
                    );
                  },
                });

                return {
                  ...currentAppData,
                  dashboards: [...currentAppData.dashboards, newDashboard],
                };
              });
            }}
          >
            <ContentCopyIcon />
          </IconButton>
          <IconButton
            title={t9n.headerControls.create}
            disabled={editDashboardNameState[0]}
            onClick={() => {
              setAppData((currentAppData) => {
                const ids = currentAppData.dashboards
                  .map((dashboard) => dashboard.id)
                  .sort((a, b) => b - a);

                const newId = ids[0] + 1;

                const newDashboard = {
                  id: newId,
                  name: t9n.newDashbordName,
                  widgets: [],
                };

                setCurrentDashboard(newDashboard);

                setSelectedDashboardIndex(ids.length);

                return {
                  ...currentAppData,
                  dashboards: [...currentAppData.dashboards, newDashboard],
                };
              });
            }}
          >
            <AddIcon />
          </IconButton>

          <ImportExportButton
            disabled={editDashboardNameState[0]}
            onDownloadClick={async () => {
              if (!isDashboardSaved) {
                const choice = await getDialogChoice({
                  title: t9n.dashboardShareDialog.title,
                  question: t9n.dashboardShareDialog.question,
                  agreeText: t9n.dashboardShareDialog.agree,
                  declineText: t9n.dashboardShareDialog.decline,
                });

                if (choice === DialogChoices.Cancel) {
                  return;
                }

                if (choice === DialogChoices.Agree) {
                  storeCurrentDashboardToAppData();
                }
              }

              downloadDashboardAsJson({
                dashboard: currentDashboard,
                schemaVersion: appData.version,
              });
            }}
            getLink={() => {
              const qwe = JSON.stringify({
                dashboard: currentDashboard,
                schemaVersion: appData.version,
              });

              const asd = encodeURIComponent(qwe);

              const url = new URL(window.location.href);

              url.hash = `importDashboard=${asd}`;

              return url.toString();
            }}
          />
        </Controls>
      }
    >
      <Dialog {...dialog} />

      <DashboardComponent
        widgets={currentDashboard.widgets}
        onChange={(widgets) => {
          setCurrentDashboard((currentState) => {
            return {
              ...currentState,
              widgets,
            };
          });
        }}
      />
    </Layout>
  );
};
