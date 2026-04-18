export enum Alteration {
  FLAT,
  SHARP,
}

export enum NoteName {
  "C",
  "C♯/D♭",
  "D",
  "D♯/E♭",
  "E",
  "F",
  "F♯/G♭",
  "G",
  "G♯/A♭",
  "A",
  "A♯/B♭",
  "B",
}

export enum Octave {
  Counter = -3,
  Big = -2,
  Small = -1,
  First = 0,
  Second = 1,
  Third = 2,
  Fourth = 3,
}

export interface Widget {
  id: string;
  name: string;
}

export interface Dashboard {
  id: number;
  name: string;
  widgets: Array<Widget>;
}

export interface AppData {
  version: number;
  dashboards: Array<Dashboard>;
  currentDashboard: number;
}
