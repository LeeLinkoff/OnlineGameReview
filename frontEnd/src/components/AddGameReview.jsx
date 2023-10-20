import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {MDBBtn} from 'mdb-react-ui-kit';
import TextField from '@mui/material/TextField';


export default function AddGameReview()
{
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div> 
      <MDBBtn onClick={handleClickOpen}>Add Online Game Review</MDBBtn>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form method='POST' action='https://onlinegamereviewsapi-dd1f095c2fa8.herokuapp.com/games'>
          <DialogTitle id="alert-dialog-title">
            {"Add New Online Game Review"}
          </DialogTitle>
          <DialogContent>
                { /* ******************************************************** */}
                {/* name attribute generates name:value pairs in body of response*/}
                <TextField id="name" label="Name" name="gameName" variant="outlined" margin="normal" />
                <br></br>
                <TextField id="url" label="URL" name="gameUrl" variant="outlined" margin="normal"/>
                <br></br>
                <TextField id="rating" label="Rating" name="gameRating" variant="outlined" margin="normal"/>
                { /* ******************************************************** */}
          </DialogContent>
          <DialogActions>
            <Button type='submit' onClick={handleClose} autoFocus>save</Button>
            <Button onClick={handleClose}>
              cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
