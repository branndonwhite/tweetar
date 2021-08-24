import React from 'react';
import SearchBar from './SearchBar';

const RightMenu = () => {
  return (
    <div style={{position: "sticky", minWidth: "20%", marginLeft: "2vw"}}>
        <SearchBar />
    </div>
  )
}

export default RightMenu;