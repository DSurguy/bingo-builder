export enum FreeSpaceSetting {
  none = "",
  center = "center",
  random = "random"
}

export type InputStepOutput = {
  lines: string[];
  freeSpaceSetting: FreeSpaceSetting;
}