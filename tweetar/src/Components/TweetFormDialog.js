import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Input, Button, IconButton, Avatar, Typography } from '@material-ui/core';
import CloseOutlined from '@material-ui/icons/CloseOutlined';

const TweetForm = (props) => {
  const { open, handleClose } = props;
  const [tweet, setTweet] = useState('');
  const [tweetLength, setTweetLength] = useState(240);

  const countTweetLength = (e) => {
    setTweet(e.target.value);
    setTweetLength(240 - e.target.value.length);
  }

  const specs = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "tweet": tweet,
      "user_id": localStorage.getItem('user_id')
    })
  }

  const createTweet = () => {
    fetch("http://localhost:3000/tweet", specs)
    .then(response => {
      switch(response.ok){
        case true:
          response.json()
          .then( result => {
            alert(result.message);
            handleClose();
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

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}  
      fullWidth={true} 
      maxWidth="sm"
    >
      <DialogTitle disableTypography style={{alignItems: "left", padding: "0"}}>
        <IconButton onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers style={{display: "flex", padding:"16px 14px"}}>
        <Avatar style={{marginRight: "10px"}}>A</Avatar>
        <Input
          name="tweet" 
          id="tweetForm" 
          type="string" 
          placeholder="What's happening?"
          multiline={true}
          onChange={e => countTweetLength(e)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Typography>{tweetLength}</Typography>
        {
          tweetLength > -1 ?
          <Button 
            color="primary"
            variant="contained"
            style={{borderRadius: "50px"}} 
            type="submit" 
            onClick={createTweet}
          >Tweet</Button>
          :
          <Button 
            color="primary"
            variant="contained"
            style={{borderRadius: "50px"}} 
            type="submit" 
            disabled
          >Tweet</Button>
        } 
      </DialogActions>
    </Dialog>
  )
}

export default TweetForm;