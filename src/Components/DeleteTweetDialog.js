import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from '@material-ui/core';

const DeleteTweetDialog = (props) => {
  const {open, handleClose, tweetData} = props;

  const specs = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const deleteItem = () => {
    fetch(`http://localhost:3000/tweet/${tweetData.t_id}`, specs)
    .then(response => {
      switch(response.ok){
        case true:
          response.json()
          .then( result => {
            alert(result.message);
          })
          break;
        case false:
          response.json()
          .then( result => {
            alert(result.message);
          })
          break;
        default:
          break;
      }
    })
  }

  const deleteAndCloseDialog = () => {
    deleteItem();
    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true} 
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">Delete Tweet?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from Tweetar search results.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
        <Button 
          color="primary"
          variant="contained"
          style={{borderRadius: "50px"}} 
          type="submit"
          onClick={deleteAndCloseDialog}
        >Delete</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteTweetDialog;