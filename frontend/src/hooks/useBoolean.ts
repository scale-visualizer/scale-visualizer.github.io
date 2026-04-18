import { useRef, useState } from "react";

export const useBoolean = (initialValue = false) => {
  const [state, setState] = useState(initialValue);

  const apiRef = useRef({
    setTrue: () => void setState(true),
    setFalse: () => void setState(false),
  });

  return [state, apiRef] as const;
};
