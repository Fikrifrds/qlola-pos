import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContextProvider';
import './Cart.css';
import ItemCart from '../components/ItemCart';
import EditItem from '../components/EditItem';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Close from '@material-ui/icons/Close';
import ListAlt from '@material-ui/icons/ListAlt';
import { makeStyles } from '@material-ui/core/styles';
import TopCart from '../components/TopCart'
import BottomCart from '../components/BottomCart'
import { Divider } from '@material-ui/core';

const CartPage = props => {
  const useStyles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(0),
      textAlign: 'left',
      // color: theme.palette.text.secondary,
      minHeight: '70vh',
      position: '-webkit-sticky', // Safari
      position: 'sticky',
      top: '10px'
    },
  }));

  const classes = useStyles();

  const context = useContext(ShopContext);
  const [ currentItem, setCurrentItem ] = useState({ product: {}});

  const [open, setOpen] = useState(false);

  const handleClickOpen = async item => {
    console.log('item', item)
      setOpen(true);
      setCurrentItem(item)
      console.log('context', context);

  };

    return (
      <React.Fragment>
      <Paper className={classes.paper}>
      <TopCart billLength={context.bills.length}/>
        <main className="cart">
        <div style={{ textAlign: 'center', fontWeight: 'bold'}}>{ context.cart.name }</div>
          {context.cart.items.length <= 0 && <p>No Item in the Cart!</p>}
          <ul>
            {context.cart.items.map( (cartItem, index) => (
              <div key={index} style={{ margin: '20px'}}>
              <ItemCart handleClickOpen={handleClickOpen} cartItem={cartItem} />
              </div>
            ))}
          </ul>
          <EditItem open={open} setOpen={setOpen} currentItem={currentItem} />
        </main>
        <div style={{ paddingTop: '80px'}}>
        <BottomCart />
        </div>
        </Paper>
      </React.Fragment>
    );
  }

export default CartPage;
