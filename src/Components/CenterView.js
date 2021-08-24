import React, { useState } from 'react';
import { Divider, Typography } from '@material-ui/core';
import TweetForm from "./TweetForm";
import Tweets from './Tweets';

const CenterView = () => {
  const [refresh, setRefresh] = useState(0);

  return (
    <div style={{ width: "55%"}}>
      <Typography variant="h5" align="left" display="block" style={{margin: "20px"}}>Home</Typography>
      <Divider />
      <TweetForm refresh={refresh} setRefresh={setRefresh} />
      <Divider />
      <Tweets refresh={refresh} setRefresh={setRefresh} />
    </div>
  )
}

export default CenterView;
