import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Settings from '@material-ui/icons/Settings';
import TrendingUp from '@material-ui/icons/TrendingUp';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function AppDrawer() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setIsOpen(open);
  };

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
    <List>
          <ListItem button>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary={'Log Out'} />
          </ListItem>
          <ListItem button>
            <ListItemIcon><TrendingUp /></ListItemIcon>
            <ListItemText primary={'Transactions'} />
          </ListItem>
          <ListItem button>
            <ListItemIcon><Settings /></ListItemIcon>
            <ListItemText primary={'Settings'} />
          </ListItem>
          
      </List>
      <Divider />
      <List>
          <ListItem button>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary={'Log Out'} />
          </ListItem>
      </List>
    </div>
  );

  return (
    <div>
    <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer(true)}>
        <MenuIcon />
    </IconButton>
      <Drawer open={isOpen} onClose={toggleDrawer(false)}>
        {sideList('left')}
      </Drawer>
    </div>
  );
}


