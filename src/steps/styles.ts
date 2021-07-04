import { makeStyles } from "@material-ui/core"

export const fontSizes = makeStyles({
  font0: {
    fontSize: '16px'
  },
  font1: {
    fontSize: '15px'
  },
  font2: {
    fontSize: '14px'
  },
  font3: {
    fontSize: '13px'
  },
  font4: {
    fontSize: '12px'
  },
  font5: {
    fontSize: '11px'
  },
  font6: {
    fontSize: '10px'
  }
})

export const gridStyles = makeStyles({
  gridRow: {
    display: 'flex',
    alignItems: 'center'
  },
  gridItem: {
    border: '1px solid #444',
    width: '80px',
    height: '100px',
    textAlign: 'center'
  }
})