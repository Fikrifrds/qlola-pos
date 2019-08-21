import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToApp from '@material-ui/icons/ExitToApp';
import DesktopMac from '@material-ui/icons/DesktopMac';
import Cached from '@material-ui/icons/Cached';
import Settings from '@material-ui/icons/Settings';
import TrendingUp from '@material-ui/icons/TrendingUp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import  { ShopContext } from '../context/ShopContextProvider'
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function Menu() {
  const shopContext = useContext(ShopContext);

  const classes = useStyles();

  const [sales, setSales] = useState(shopContext.sales);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSales(shopContext.sales);
  }, [shopContext.createSale])

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
      
      onKeyDown={toggleDrawer(false)}
    >
    <List>
      <ListItem>
        <ListItemIcon><AccountCircle /></ListItemIcon>
        <ListItemText primary={'Outlet 1'} />
      </ListItem>

      <ListItem>
        
        <ListItemText >
          <small>{ sales.length } transaksi belum terupdate</small><br/>
          <Button onClick={e => e.preventDefault() } size="small" variant="contained" color="primary">Update</Button>
        </ListItemText>
      </ListItem>
    <Divider />
<div onClick={toggleDrawer(false)}>
    <Link to="">
      <ListItem button>
        <ListItemIcon><DesktopMac /></ListItemIcon>
        <ListItemText primary={'Point Of Sale'} />
        
      </ListItem>
    </Link>
          <ListItem button>
            <ListItemIcon><TrendingUp /></ListItemIcon>
            <ListItemText primary={'Transactions'} />
          </ListItem>
          <ListItem button>
            <ListItemIcon><Settings /></ListItemIcon>
            <ListItemText primary={'Settings'} />
          </ListItem>
           
      
      <Divider />
      
          <ListItem button>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary={'Log Out'} />
          </ListItem>
          </div> 
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


