import { MillisPerPoint, SingleBoxSizeMilli, SingleBoxSizePx } from "./constants";

export const pxFontToPt = (fontSizePx: number) => SingleBoxSizeMilli.w * (fontSizePx / SingleBoxSizePx.w) / MillisPerPoint;