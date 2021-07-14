import { makeStyles } from "@material-ui/core"
import { SingleBoxSizePx } from "../utils/constants"

export const gridStyles = makeStyles({
  gridContainer: {
    width: '85%',
    margin: '0 auto'
  },
  grid: {
    width: `${SingleBoxSizePx.w * 5}px`,
    height: `${SingleBoxSizePx.h * 5}px`
  },
  gridScaled: {
    transformOrigin: 'top-left'
  },
  gridRow: {
    display: 'flex'
  },
  gridItem: {
    border: '1px solid #444',
    boxSizing: 'border-box',
    width: `${SingleBoxSizePx.w}px`,
    height: `${SingleBoxSizePx.h}px`,
    textAlign: 'center'
  }
})