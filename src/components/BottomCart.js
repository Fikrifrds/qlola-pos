import React, { useState, useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import RemoveShoppingCart from '@material-ui/icons/RemoveShoppingCart';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HorizontalSplit from '@material-ui/icons/HorizontalSplit';
import Bill from './Bill';
import { ShopContext } from '../context/ShopContextProvider';
import CheckOut from './CheckOut';
import SplitBill from './SplitBill';

export default function BottomCart(){
  const context = useContext(ShopContext);
  // const price = context.cart.items.reduce((a,b) => a + b.price*b.quantity,0);

  const [openSplitBill, setOpenSplitBill ] = useState(false);
  
  const removeItemsInCart = () => {
    if(context.cart.items.length){
      if(window.confirm('Do you want to remove all items from cart?')){
        context.removeProductsInCart()
      }
    } else {
      alert('There is no item in cart.')
    }
    
  }
  
  // const openCheckOut = () => {
  //   setOpen(true)
  // }

    return (
      <div className="bottom-cart">
      { context.cart.items.length ?
        <div className="inside-bottom-cart" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px'}}>
          <IconButton aria-label="Split" title="Split Bill" onClick={ () => setOpenSplitBill(true)}>
            <HorizontalSplit />
          </IconButton>
          <SplitBill openSplitBill={openSplitBill} setOpenSplitBill={setOpenSplitBill} />
          <IconButton aria-label="Delete" title="Empty Cart" onClick={removeItemsInCart}>
            <RemoveShoppingCart />
          </IconButton>
        </div>
        :''
      }
        {/* <div onClick={ price ? openCheckOut : () => {}} className={`bottom ${ price ? 'bottom-active': ''}`}>
              <div style={{ cursor: `${price ? 'pointer' : 'not-allowed'}`}} className="charge-button">Pay Rp {price.toLocaleString('id')}</div>
        </div>
        <CheckOut open={open} setOpen={setOpen} /> */}
        </div>
    )
}