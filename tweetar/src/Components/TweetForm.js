import React, { useState } from 'react';
import { Grid, Avatar, Input, Button, Box, Typography } from '@material-ui/core';

const TweetForm = (props) => {
  const { refresh, setRefresh } = props;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    createTweet();
    setTweet('');
    setRefresh(refresh + 1);
  }

  return (
    <div style={{margin: "20px", maxWidth: 650}}>
      <Grid container>
        <Grid item xs={1}>
          <Avatar style={{marginRight: "5px"}}>A</Avatar>
        </Grid>
        <Grid item xs>
          <Input
            name="tweet" 
            id="tweetForm" 
            type="string" 
            placeholder="What's happening?"
            multiline={true}
            value={tweet}
            onChange={e => countTweetLength(e)}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container>
        <Box component="span"
          style={{
            width: "100%",
            display: "flex",
            padding: "8px 0",
            justifyContent: "flex-end",
            alignItems: "flex-end"
          }}
        >
          <Typography style={{padding: '5px 10px'}}>{tweetLength}</Typography>
          {
            tweetLength > -1 ?
            <Button 
              color="primary"
              variant="contained"
              style={{borderRadius: "50px"}} 
              type="submit" 
              onClick={handleSubmit}
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
        </Box>
      </Grid>
    </div>
  )
}

export default TweetForm;