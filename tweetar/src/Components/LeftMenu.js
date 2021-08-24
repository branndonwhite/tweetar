import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Navigation from '../Components/Navigation';
import TweetFormDialog from '../Components/TweetFormDialog';
import CurrentUser from './CurrentUser';

const LeftMenu = () => {
  const [isTweetDialogOpen, setDialogState] = useState(false);

  const handleDialog = () => {
    setDialogState(!isTweetDialogOpen);
  }
  
  return (
    <div style={{position: "sticky", minWidth: "20%", marginRight: "2vw"}}>
      <Navigation />
        <Button
          color="primary"
          variant="contained"
          style={{borderRadius: "50px", width: "90%", height: "50px"}} 
          type="submit" 
          onClick={handleDialog}
        >Tweet</Button>
        <TweetFormDialog 
          open={isTweetDialogOpen}
          handleClose={handleDialog}
        />
        <Box component="span"
          style={{
            position: "sticky",
            height: "28vh",
            display: "flex",
            padding: 8,
            justifyContent: "flex-end",
            alignItems: "flex-end"
          }}
        >
          <CurrentUser />
        </Box>
    </div>
  )
}

export default LeftMenu;