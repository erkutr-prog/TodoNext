import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

type Props = {
  open: boolean,
  dialogToggle: Function,
  handleAgree: Function,
  header: string,
  content: string,
}

export default function CustomDialog({open, dialogToggle, handleAgree, header, content}: Props) {
  return (
    <Dialog
    open={open}
    onClose={() => dialogToggle(false)}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {header}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {content}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => dialogToggle(false)}>No</Button>
      <Button onClick={() => handleAgree()} autoFocus>
        Yes
      </Button>
    </DialogActions>
  </Dialog>
  )
}