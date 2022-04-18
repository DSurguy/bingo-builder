import { atom } from "recoil";
import { AppStep } from "../types";

export const appStepState = atom({
  key: 'appStep',
  default: AppStep.projectList
});

export const saveInProgressState = atom({
  key: 'saveInProgress',
  default: false
})