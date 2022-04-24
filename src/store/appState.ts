import { atom } from "recoil";
import { AppStep } from "../types";
import localStorageEffect from "./effects/localStorage";

export const appStepState = atom({
  key: 'appStep',
  default: AppStep.projectList
});

export const saveInProgressState = atom({
  key: 'saveInProgress',
  default: false
})

export const cookieConsentState = atom({
  key: 'cookieConsent',
  effects: [
    localStorageEffect<boolean>("bingo-builder/settings/cookie-consent")
  ],
  default: false
})