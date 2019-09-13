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
import Palette from '@material-ui/icons/Palette';
import TrendingUp from '@material-ui/icons/TrendingUp';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import SwapHorizontalCircle from '@material-ui/icons/SwapHorizontalCircle';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import  { ShopContext } from '../context/ShopContextProvider';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import Category from '@material-ui/icons/Category';
import Collapse from '@material-ui/core/Collapse';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  avatar: {
    margin: 10,
  },
  orangeAvatar: {
    marginRight: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Menu() {
  const shopContext = useContext(ShopContext);

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  function handleClick(e) {
    e.stopPropagation();
    setOpen(!open);
  }

  function isSelected(value){
    return window.location.pathname.split('/')[1] === value ? true : false
  }

  function isParentOpened(){
    const paths = ['products', 'categories', 'modifiers']
    paths.includes(window.location.pathname.split('/')[1]) && setOpen(true);
  }

  const [sales, setSales] = useState(shopContext.sales);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSales(shopContext.sales);
  }, [shopContext.createSale])

  const toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    open ? isParentOpened() : setOpen(false);
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
      <Avatar className={classes.orangeAvatar}>V</Avatar>
        <ListItemText>
          Vicky<br/>
          <small>Outlet 1</small>
          </ListItemText>
        
      </ListItem>

      {/* <ListItem>
        
        <ListItemText >
          <small>{ sales.length } transaksi belum terupdate</small><br/>
          <Button onClick={e => e.preventDefault() } size="small" variant="contained" color="primary">Update</Button>
        </ListItemText>
      </ListItem> */}
    <Divider />
<div onClick={toggleDrawer(false)}>
    <Link to='/'>
      <ListItem button selected={isSelected('')}>
        <ListItemIcon><DesktopMac /></ListItemIcon>
        <ListItemText primary={'Point Of Sale'} />
        
      </ListItem>
    </Link>
    <Link to="/transactions">
          <ListItem button selected={isSelected('transactions')}>
            <ListItemIcon><TrendingUp /></ListItemIcon>
            <ListItemText primary={'Transactions'} />
          </ListItem>
    </Link>
          <ListItem button onClick={handleClick}>
            <ListItemIcon><LibraryBooks /></ListItemIcon>
            <ListItemText primary={'Library'} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/products">
                <ListItem button className={classes.nested} selected={isSelected('products')}>
                <ListItemIcon><ShoppingBasket /></ListItemIcon>
                  <ListItemText primary="Product" />
                </ListItem>
              </Link>
              <Link to="/categories">
                <ListItem button className={classes.nested} selected={isSelected('categories')}>
                <ListItemIcon><Category /></ListItemIcon>
                  <ListItemText primary="Category" />
                </ListItem>
              </Link>
              <Link to="/modifiers">
                <ListItem button className={classes.nested} selected={isSelected('modifiers')}>
                <ListItemIcon><Palette /></ListItemIcon>
                  <ListItemText primary="Modifier" />
                </ListItem>
              </Link>
            </List>
          </Collapse>
          <ListItem button selected={isSelected('operators')}>
            <ListItemIcon><AccountCircle /></ListItemIcon>
            <ListItemText primary={'Ganti Operator'} />
          </ListItem>
    <Link to="/settings">
          <ListItem button selected={isSelected('settings')}>
            <ListItemIcon><Settings /></ListItemIcon>
            <ListItemText primary={'Settings'} />
          </ListItem>
    </Link>
      
      <Divider />
      
          <ListItem button>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary={'Sign Out'} />
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


