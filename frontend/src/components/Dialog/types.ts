type CommonProps = {
  onCancel: () => void;
  onAgree: () => void;
  onDecline: () => void;
};

type OpenedProps = CommonProps & {
  isOpen: true;
  title: string;
  question: string;
  agreeText: string;
  declineText: string;
};

type ClosedProps = CommonProps & {
  isOpen: false;
  title?: undefined;
  question?: undefined;
  agreeText?: undefined;
  declineText?: undefined;
};

export type DialogProps = OpenedProps | ClosedProps;
