import { AppData } from "../types";

export const initialData: AppData = {
  version: 0,
  currentDashboard: 0,
  dashboards: [
    {
      id: 0,
      name: "New dashboard",
      widgets: [
        {
          id: "0",
          name: "New widget",
        },
        {
          id: "1",
          name: "New widget 2",
        },
        {
          id: "2",
          name: "New widget 3",
        },
        {
          id: "3",
          name: "New widget 4",
        },
        {
          id: "4",
          name: "New widget 5",
        },
      ],
    },
    {
      id: 1,
      name: "New dashboard 2",
      widgets: [
        {
          id: "0",
          name: "New widget",
        },
      ],
    },
    {
      id: 2,
      name: "New dashboard 3",
      widgets: [
        {
          id: "0",
          name: "New widget",
        },
        {
          id: "1",
          name: "New widget 2",
        },
      ],
    },
    {
      id: 3,
      name: "New dashboard 4",
      widgets: [
        {
          id: "0",
          name: "New widget",
        },
        {
          id: "1",
          name: "New widget 2",
        },
        {
          id: "2",
          name: "New widget 3",
        },
        {
          id: "3",
          name: "New widget 4",
        },
      ],
    },
  ],
};
