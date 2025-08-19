import { Alteration, NoteName, Octave } from "../../types";

const noteNames: Record<NoteName, string> = {
  [NoteName["C"]]: "C",
  [NoteName["C♯/D♭"]]: "C♯/D♭",
  [NoteName["D"]]: "D",
  [NoteName["D♯/E♭"]]: "D♯/E♭",
  [NoteName["E"]]: "E",
  [NoteName["F"]]: "F",
  [NoteName["F♯/G♭"]]: "F♯/G♭",
  [NoteName["G"]]: "G",
  [NoteName["G♯/A♭"]]: "G♯/A♭",
  [NoteName["A"]]: "A",
  [NoteName["A♯/B♭"]]: "A♯/B♭",
  [NoteName["B"]]: "B",
};

const alterations: Record<number, Record<number, string>> = {
  [NoteName["C♯/D♭"]]: {
    [Alteration.SHARP]: "C♯",
    [Alteration.FLAT]: "D♭",
  },
  [NoteName["D♯/E♭"]]: {
    [Alteration.SHARP]: "D♯",
    [Alteration.FLAT]: "D♭",
  },
  [NoteName["F♯/G♭"]]: {
    [Alteration.SHARP]: "F♯",
    [Alteration.FLAT]: "G♭",
  },
  [NoteName["G♯/A♭"]]: {
    [Alteration.SHARP]: "G♯",
    [Alteration.FLAT]: "A♭",
  },
  [NoteName["A♯/B♭"]]: {
    [Alteration.SHARP]: "A♯",
    [Alteration.FLAT]: "B♭",
  },
};

const octaveNames: Record<Octave, string> = {
  [Octave.Counter]: "Counter",
  [Octave.Big]: "Big",
  [Octave.Small]: "Small",
  [Octave.First]: "First",
  [Octave.Second]: "Second",
  [Octave.Third]: "Third",
  [Octave.Fourth]: "Fourth",
};

export const en = {
  buttonToRepo: {
    title: "Github repo",
  },
  noteNames,
  alterations,
  octaveNames,
  dashboardSwitchDialog: {
    title: "Current dashboard has unsaved changes",
    question: "Dou you want to save them?",
    agree: "Save",
    decline: "Drop changes",
  },
  headerControls: {
    save: "Save changes",
    revert: "Revert changes",
    delete: "Delete dashboard",
    rename: "Rename dashboard",
    cancelRename: "Cancel rename",
    copy: "Copy dashboard",
    create: "Create new dashboard",
    share: "Share dashboard",
  },
  dashboardDeleteDialog: {
    title: (dashboardName: string) =>
      `Delete the "${dashboardName}" dashboard?`,
    question: "A deleted dashboard cannot be restored.",
    agree: "Delete",
    decline: "Cancel",
  },
  copiedDashbordName: (name: string) => `${name} copy`,
  copiedDashboardSnackbar: {
    message: "Copied",
    action: "Open",
    error:
      "Looks like your browser block the access to the clipboard. You can copy the link manually",
  },
  newDashbordName: "New dashboard",
  dashboardShareDialog: {
    title: "Current dashboard has unsaved changes",
    question: "Do you want to save current changes before share?",
    agree: "Save",
    decline: "Share unsaved",
  },
  importExportDialog: {
    title: "Import or export the dashboard",
    exportTabName: "Export",
    importTabName: "Import",
    downloadButton: "Download as a file",
    downloadLabel:
      "This is the recommended way. It has almost no limitations, just don't change its content by yourself.",
    generateLinkButon: "Share as a link",
    linkLabel:
      "This way is convenient for sharing small dashboard. Note that even in this case the link will be quite large.",
  },
  parseAppDataErrors: {
    incorrectAppVersion: "Incorrect app versions",
    incorrectDashboards: "Incorrect dashboards",
    incorrectCurrenDashboard: "Incorrect currentDashboard",
  },
  parseDashboardErrors: {
    incorrectDashboardId: "Incorrect dashboard id",
    incorrectDashboardName: "Incorrect dashboard name",
    incorrectWidgetId: (index: number) =>
      `Incorrect id for widget with index ${index}`,
    incorrectWidgetName: (index: number) =>
      `Incorrect name for widget with index ${index}`,
    incorrectWidgets: "Incorrect widgets",
    invalidSchemaVersion: "Invalid schemaVersion",
  },
  // todo: delete?
  importFile: {
    label: "Drop a file or click here",
    errors: {
      fileReading: "Error while reading the file",
      fileFormat: "File is not recognized due its format",
      fileAbsent: "File doesn't exists",
      jsonFormat: "JSON is invalid",
      dashboardParsing: "Unknown error while parsing dashboard",
      dashbordFormat: "Imported dashboard has incorrect format",
    },
  },
  restoreDataErrors: {
    failedToParse:
      "Failed to parse saved data. Look to developer console for details",
    localStorageUnavailable:
      "It looks like your browser is denying access to the localStorage",
  },
};
