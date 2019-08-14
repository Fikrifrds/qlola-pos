
import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import { Link, NavLink, BrowserRouter } from 'react-router-dom';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Close from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import AppDrawer from './AppDrawer';
import SearchBox from './SearchBox';
import CheckOut from'./CheckOut';
import { withStyles } from '@material-ui/core/styles';
import { ShopContext } from '../context/ShopContextProvider';
import Badge from '@material-ui/core/Badge';
import MediaQuery from 'react-responsive';

// const Bottom = () => {
//     const context = useContext(ShopContext);
//     return (
//         <div>
//         {JSON.stringify(context.cart)}
//         </div>
//     )
    
//     }

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: '#3f51b5'
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: '-10vh',
    left: 0,
    right: '-80vw',
    margin: '0 auto',
  },
  typography: {
    fontWeight: 'bold',
    fontSize: '30px',
    paddingRight: '50px',
    color: 'yellow'
  }
}));

const StyledBadge = withStyles(theme => ({
  badge: {
    top: '20%',
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
}))(Badge);

export default function BottomAppBar() {
  const classes = useStyles();
  const context = useContext(ShopContext);
  const price = context.cart.items.reduce((a,b) => a + b.price*b.quantity,0);
  const [open, setOpen ] = useState(false);
  
  const openCheckOut = () => {
    setOpen(true);
  }

return(
   <MediaQuery orientation="portrait">
    {(matches) => {
  return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <AppDrawer />
          { matches ? 
            window.location.pathname === "/cart" ?
            <NavLink to="/">
              <Fab aria-label="close" className={classes.fabButton}>
                  <Close />
              </Fab>
            </NavLink> 
            :
            <NavLink to="/cart">
              <Fab aria-label="shopping-cart" className={classes.fabButton}>
                <StyledBadge badgeContent={context.cart.items.reduce((a,b) => a + b.quantity,0)} color="primary">
                  <ShoppingCart />
                </StyledBadge>
              </Fab>
            </NavLink> 
            :''
          }
          
          <div className={classes.grow} />
          {/* <div>
          <Typography className={classes.typography}>
            Rp {context.cart.items.reduce((a,b) => a + b.price*b.quantity,0).toLocaleString('id')}
          </Typography>
            </div> */}

            <div onClick={ price ? openCheckOut : () => {}} className={`bottom-app ${ price ? 'bottom-app-active': ''}`}>
              <div style={{ cursor: `${price ? 'pointer' : 'not-allowed'}`}} className="charge-app-button">Pay Rp {price.toLocaleString('id')}</div>
            </div>
        <CheckOut open={open} setOpen={setOpen} price={price} />

          {/* <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton edge="end" color="inherit">
            <MoreIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>
  )
  }}
  </MediaQuery>
);
}