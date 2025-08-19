import React from "react";

import { LocalStorage } from "../utils/LocalStorage";

const localStorage = new LocalStorage();

export const useLocalStorage = <Value extends string>({
  key,
  eventName = "local-storage-event",
  defaultValue = "" as Value,
}: {
  key: string;
  eventName?: string;
  defaultValue?: Value;
}) => {
  const state = React.useSyncExternalStore<Value>(
    (onStoreChange) => {
      const abortController = new AbortController();

      window.addEventListener(eventName, onStoreChange, {
        signal: abortController.signal,
      });

      return () => {
        abortController.abort();
      };
    },
    () => {
      const result = localStorage.getItem<Value>(key);

      return result.isRight() ? result.value : defaultValue;
    },
  );

  const setStateRef = React.useRef((value: Value) => {
    localStorage
      .setItem(key, value)
      .mapRight(() => {
        window.dispatchEvent(new StorageEvent(eventName));
      })
      .mapLeft(() => {});
    // try {
    //   localStorage.setItem(key, value);
    //   window.dispatchEvent(new StorageEvent(eventName));
    // } catch (e) {
    //   console.error(e);
    // }
  });

  return [state, setStateRef.current] as const;
};

// enum Feature {
//   statements,
// }

// const delimeter = ",";

// export const useFeatureFlags = () => {
//   const [state, setState] = useLocalStorage<string>({
//     key: "features",
//     eventName: "features",
//     defaultValue: "",
//   });

//   const flags = React.useMemo(() => {
//     return state.split(delimeter).reduce<Set<Feature>>((result, item) => {
//       if (item !== "") {
//         result.add(Number(item));
//       }

//       return result;
//     }, new Set());
//   }, [state]);

//   const toggleFlag = React.useCallback(
//     (flagName: Feature) => {
//       const newFlags = (
//         flags.has(flagName)
//           ? [...flags.values()].filter((name) => name !== flagName)
//           : [...flags.values(), flagName]
//       ).join(delimeter);

//       setState(newFlags);
//     },
//     [flags, setState],
//   );

//   return [flags, toggleFlag] as const;
// };

// export const FeatureFlagsContext = React.createContext<Set<Feature>>(null);

// export const FeatureFlagsUpdateContext =
//   React.createContext<(feature: Feature) => void>(null);

// export const FeatureFlagsProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [flags, toggleFlag] = useFeatureFlags();

//   return (
//     <FeatureFlagsContext.Provider value={flags}>
//       <FeatureFlagsUpdateContext.Provider value={toggleFlag}>
//         {children}
//       </FeatureFlagsUpdateContext.Provider>
//     </FeatureFlagsContext.Provider>
//   );
// };
