import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { 
  HomeOutlined, 
  ExploreOutlined, 
  NotificationsOutlined, 
  MailOutlined, 
  BookmarkBorderOutlined,
  ListAltOutlined, 
  PersonOutlined, 
  MoreHorizOutlined
} from '@material-ui/icons';

const Navigation = () => {
  const iconObject = {
    "Home" : <HomeOutlined />,
    "Explore" : <ExploreOutlined />,
    "Notifications" : <NotificationsOutlined />,
    "Messages" : <MailOutlined />,
    "Bookmarks" : <BookmarkBorderOutlined />,
    "Lists" : <ListAltOutlined />,
    "Profile" : <PersonOutlined />,
    "More" : <MoreHorizOutlined />
  };

  return (
    <>
      <List component="nav">
        {
          Object.keys(iconObject).map((key, index) =>
            <ListItem button component={RouterLink} to={'/'+key.toLowerCase()}>
              <ListItemIcon>
                {iconObject[key]}
              </ListItemIcon>
              <ListItemText primary={key} />
            </ListItem>
          ) 
        }
      </List>
    </>
  )
}

export default Navigation;