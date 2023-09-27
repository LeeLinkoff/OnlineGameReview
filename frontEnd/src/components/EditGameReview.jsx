import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


export default function EditGameReview(props)
{
  // !! IMPORTANT !!
  // variable names MUST MATCH names of properties where being component being used
  var {selectedId, selectedName, selectedUrl, selectedRating, open, onClose} = props;

  // "template literal" - enclosed in backtick (`) with variable names enclosed using ${variableName} translated to their values
  console.log(`EditGameReview,  Passed => id: ${selectedId}, name: ${selectedName}, ${selectedUrl}, rating: ${selectedRating}`);

  async function handleClose() {
    console.log("click save button");
    onClose();
  };

  function handleCancel() {
    console.log("click cancel button");
    onClose();
  }

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"

      ><form method="POST" action={"http://localhost:81/games/"+selectedId}>
        <DialogTitle id="alert-dialog-title">
          {"Edit Online Game Review"}
        </DialogTitle>
        <DialogContent>
            <TextField defaultValue={selectedName} name="name" id="name" label="Game Name" variant="outlined" margin="normal" />
            <br></br>
            <TextField defaultValue={selectedUrl} name="url" id="outlined-basic" label="Game URL" variant="outlined" margin="normal"/>
            <br></br>
            <TextField defaultValue={selectedRating} name="rating" id="outlined-basic" label="Game Rating" variant="outlined" margin="normal"/>
          </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleClose} autoFocus>save</Button>
          <Button onClick={handleCancel}>cancel</Button>
        </DialogActions>
        </form>
      </Dialog>
  );
}
