import React from 'react';
import { Container, Divider } from '@material-ui/core';
import LeftMenu from '../Components/LeftMenu';
import CenterView from '../Components/CenterView';
import RightMenu from '../Components/RightMenu';

const Home = () => {  
  return (
    <>
      <Container 
        maxWidth="lg" 
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: 0
        }}>
          <LeftMenu />
          <Divider orientation="vertical" flexItem />
          <CenterView />
          <Divider orientation="vertical" flexItem />
          <RightMenu />
      </Container>
    </>
  )
}

export default Home;