export enum FreeSpaceSetting {
  none = "",
  center = "center",
  random = "random"
}

export type DifficultyKey = 'easy' | 'medium' | 'hard';

export type LinesByDifficulty = {
  easy: string[],
  medium: string[],
  hard: string[]
}

export type LineAndStyle = {
  line: string;
  fontSize: number;
}

export type LineAndStyleByDifficulty = {
  easy: LineAndStyle[],
  medium: LineAndStyle[],
  hard: LineAndStyle[]
}

export type Settings = {
  freeSpace: FreeSpaceSetting,
  easy: number,
  medium: number,
  hard: number
}

export type InputStepOutput = {
  lines: LinesByDifficulty,
  settings: Settings
}