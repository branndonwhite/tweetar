import React from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/styles';
import SearchOutlined from '@material-ui/icons/SearchOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 300,
    borderRadius: '50px',
    marginTop: '15px'
  },
  input: {
    marginLeft: '8px',
    flex: 1,
  },
  iconButton: {
    padding: 10,
  }
}));

const SearchBar = () => {
  const classes = useStyles();

  return (
    <Paper elevation={0} variant="outlined" component="form" className={classes.root}>
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchOutlined />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search Tweetar"
      />
    </Paper>
  )
}

export default SearchBar;