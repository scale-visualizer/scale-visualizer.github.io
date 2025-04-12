import { Either, right, left } from "@sweet-monads/either";

import { t9n } from "../t9n/t9n";
import { Dashboard } from "../types";

import { ParseError, ParseErrorEnum } from "./ParseError";

export const parseV0Dashboard = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): Either<
  {
    code: ParseError;
    errors: Array<string>;
  },
  Dashboard
> => {
  try {
    const errors = [];

    const dashboard: Dashboard = {
      id: (() => {
        const id = obj?.dashboard?.id;

        if (typeof id === "number" && isFinite(id) && !isNaN(id) && id > -1) {
          return id;
        }

        errors.push(t9n.parseDashboardErrors.incorrectDashboardId);

        return -1;
      })(),
      name: (() => {
        const name = obj?.dashboard?.name;

        if (typeof name === "string" && name.length) {
          return name;
        }

        errors.push(t9n.parseDashboardErrors.incorrectDashboardName);

        return "";
      })(),
      widgets: (() => {
        const widgets = obj?.dashboard?.widgets;

        if (Array.isArray(widgets)) {
          return widgets.map((maybeWidget, index) => {
            const widget = {
              id: "",
              name: "",
            };

            const id = maybeWidget.id;
            if (typeof id === "string" && id.length) {
              widget.id = id;
            } else {
              errors.push(t9n.parseDashboardErrors.incorrectWidgetId(index));
            }

            const name = maybeWidget.name;
            if (typeof name === "string" && name.length) {
              widget.name = name;
            } else {
              errors.push(t9n.parseDashboardErrors.incorrectWidgetName(index));
            }

            return widget;
          });
        } else {
          errors.push(t9n.parseDashboardErrors.incorrectWidgets);

          return [];
        }
      })(),
    };

    if (errors.length) {
      return left({
        code: ParseErrorEnum.IvalidFormat,
        errors,
      });
    }

    return right(dashboard);
  } catch {
    return left({
      code: ParseErrorEnum.Failed,
      errors: [],
    });
  }
};
