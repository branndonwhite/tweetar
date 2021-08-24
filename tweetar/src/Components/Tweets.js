import React, { useState, useEffect } from 'react';
import { Avatar, Typography, Paper, Grid, IconButton, Menu, MenuItem } from '@material-ui/core';
import { 
  ChatBubbleOutlineOutlined, 
  FormatQuoteOutlined, 
  FavoriteBorderOutlined, 
  SendOutlined,
  MoreHorizOutlined 
} from '@material-ui/icons';
import moment from 'moment';
import EditTweetFormDialog from './EditTweetFormDialog';
import DeleteTweetDialog from './DeleteTweetDialog';

const Tweets = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [allTweet, setAllTweet] = useState([]);
  const [selectedTweet, setSelectedTweet] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [openOption, setOpenOption] = useState(false);
  const { refresh, setRefresh } = props;

  const open = Boolean(anchorEl);

  useEffect(() => {
    fetch("http://localhost:3000/tweet", {
      method: 'GET'
    })
    .then(response => {
      switch(response.ok){
        case true:
          response.json()
          .then( result => {
            setAllTweet(result);
          });
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
  }, [refresh]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedTweet(null);
    setEditDialogOpen(false);
    setDeleteDialogOpen(false);
    setOpenOption(false);
    setRefresh(refresh + 1);
  };

  const handleEdit = (id, tweet) => {
    setOpenOption(false);
    setSelectedTweet({"t_id": id, "tweet": tweet});
    setEditDialogOpen(!editDialogOpen);
  }

  const handleDelete = (id) => {
    setOpenOption(false);
    setSelectedTweet({"t_id": id});
    setDeleteDialogOpen(!deleteDialogOpen);
  }

  const options = [
    "Unfollow",
    "Add/remove from Lists",
    "Mute",
    "Block",
    "Embed tweet",
    "Report tweet"
  ]

  const renderOptions = () => {
    if (!openOption) return;
    const {uid, t_id, tweet} = selectedTweet;

    return (
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        transformOrigin="center right"
        PaperProps={{
          style: {
            width: '30ch'
          },
        }}
      >
        {
          String(uid) === String(localStorage.getItem('user_id')) ?
          [
            <MenuItem onClick={() => handleEdit(t_id, tweet)}>Edit Tweet</MenuItem>,
            <MenuItem onClick={() => handleDelete(t_id)}>Delete Tweet</MenuItem>,
            <MenuItem onClick={() => handleClose()}>Embed Tweet</MenuItem>
          ]
          :
          options.map((option) => (
            <MenuItem key={option} onClick={handleClose}>
              {option}
            </MenuItem>
          ))
        }
      </Menu>
    )
  }

  const generateTweet = () => {
    return allTweet.map(tweetData => {
      const {t_id, name, username, tweet, tweet_time, edited} = tweetData;
      const formattedTime = moment(tweet_time).format('ll');

      return (
        <Paper elevation={0} variant="outlined" square style={{padding: "20px", maxWidth: 650}} key={t_id}>
          <Grid container xs={12} spacing={0}>
            <Grid item xs={1}>
              <Avatar>A</Avatar>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={11}>
                  <Typography variant="body1" align="left">
                    {name} {'@'+username} • {formattedTime} {edited ? '• edited' : ''}
                  </Typography>
                  <Typography variant="body2" align="left">
                    {tweet}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <IconButton onClick={(e) => {handleClick(e); setSelectedTweet(tweetData); setOpenOption(true)}}>
                    <MoreHorizOutlined />
                  </IconButton>
                </Grid>
                <Grid item xs={3}>
                  <IconButton>
                    <ChatBubbleOutlineOutlined fontSize="small" /> 
                  </IconButton> 
                </Grid>
                <Grid item xs={3}>
                  <IconButton>
                    <FormatQuoteOutlined fontSize="small" /> 
                  </IconButton>
                </Grid>
                <Grid item xs={3}>
                  <IconButton>
                    <FavoriteBorderOutlined fontSize="small" />
                  </IconButton>
                </Grid>       
                <Grid item xs={3}>
                  <IconButton>
                    <SendOutlined fontSize="small" />
                  </IconButton> 
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      )
    })
  }

  return (
    <div>
      <Grid container xs={12} direction="column">
        {renderOptions()}
        {generateTweet()}
        <EditTweetFormDialog
          open={editDialogOpen}
          handleClose={() => handleClose()}
          tweetData={selectedTweet}
        />
        <DeleteTweetDialog 
          open={deleteDialogOpen}
          handleClose={() => handleClose()}
          tweetData={selectedTweet}
        />
      </Grid>
    </div>
  )
}

export default Tweets;