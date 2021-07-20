import { ChangeEvent } from "react";

export const validateInteger = (
  e: ChangeEvent<HTMLInputElement>,
  onInvalid: () => void,
  onValid: (val: number) => void
): void => {
  const targetValue: string = e.target.value;
  if (targetValue.includes(".")) {
    onInvalid();
  } else {
    onValid(Number(targetValue));
  }
};

export interface Feedback {
  readonly giveFeedback: (msg: string) => void;
  readonly hideFeedback: () => void;
}
