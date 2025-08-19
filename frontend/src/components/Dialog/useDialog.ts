import { useRef, useEffect } from "react";

import { useBoolean } from "../../hooks/useBoolean";

import { DialogChoices } from "./DialogChoices";
import { DialogProps } from "./types";

export const useDialog = () => {
  const [isOpen, isOpenApi] = useBoolean();

  const metaRef = useRef<
    | undefined
    | {
        title: string;
        question: string;
        agreeText: string;
        declineText: string;
      }
  >();

  const promiseRef = useRef(Promise.withResolvers<DialogChoices>());

  useEffect(() => {
    return () => {
      if (isOpen) {
        metaRef.current = undefined;
        promiseRef.current = Promise.withResolvers<DialogChoices>();
      }
    };
  }, [isOpen]);

  const apiRef = useRef({
    getChoice: (args: {
      title: string;
      question: string;
      agreeText: string;
      declineText: string;
    }) => {
      metaRef.current = args;
      isOpenApi.current.setTrue();

      return promiseRef.current.promise.finally(() => {
        isOpenApi.current.setFalse();
      });
    },
    onCancel: () => {
      promiseRef.current.resolve(DialogChoices.Cancel);
    },

    onAgree: () => {
      promiseRef.current.resolve(DialogChoices.Agree);
    },

    onDecline: () => {
      promiseRef.current.resolve(DialogChoices.Decline);
    },
  });

  return {
    isOpen: isOpen,
    ...apiRef.current,
    ...metaRef.current,
  } as DialogProps & {
    getChoice: (args: {
      title: string;
      question: string;
      agreeText: string;
      declineText: string;
    }) => Promise<DialogChoices>;
  };
};
