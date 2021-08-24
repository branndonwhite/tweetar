import React from 'react';
import { Grid, Avatar, Typography, Menu, MenuItem, IconButton } from '@material-ui/core';
import MoreHorizOutlined from '@material-ui/icons/MoreHorizOutlined';

const CurrentUser = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = [
    "Add an existing account",
    `Log out @${localStorage.getItem('username')}`
  ];

  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <Avatar>A</Avatar>
        </Grid>
          <Grid item xs direction="column">
          <Typography variant="body1" align="left">
            {localStorage.getItem('name')}
          </Typography>
          <Typography variant="body2" align="left" gutterBottom>
            {'@'+localStorage.getItem('username')}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={handleClick}>
            <MoreHorizOutlined />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            transformOrigin="center top"
            PaperProps={{
              style: {
                width: '30ch'
              },
            }}
          >
            {
              options.map((option) => (
                <MenuItem key={option} onClick={handleClose}>
                  {option}
                </MenuItem>
              ))
            }
          </Menu>
        </Grid>
      </Grid>
    </>
  )
}

export default CurrentUser;