import { makeStyles } from "@material-ui/core"
import { SingleBoxSizePx } from "../utils/constants"

export const gridStyles = makeStyles({
  gridRow: {
    display: 'flex',
    alignItems: 'center'
  },
  gridItem: {
    border: '1px solid #444',
    width: `${SingleBoxSizePx.w}px`,
    height: `${SingleBoxSizePx.h}px`,
    textAlign: 'center'
  }
})