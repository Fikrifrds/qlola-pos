import React, { useState,useContext } from 'react';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { makeStyles } from '@material-ui/core/styles';
import { ShopContext } from '../context/ShopContextProvider';


const useStyles = makeStyles(theme => ({
    root: {
      color: theme.palette.text.primary,
    },
    icon: {
      margin: theme.spacing(1),
      fontSize: 25,
      color: 'red'
    },
  }));
  

export default function ItemCart( { cartItem, handleClickOpen }){
  const context = useContext(ShopContext);
  const classes = useStyles();
console.log('itemcart', context)
    return (
    <div onClick={() => handleClickOpen(cartItem)} className="pointer" style={{ display: 'flex', justifyContent: 'space-between'}}>

        <div>
            <strong>{cartItem.product.name}</strong>
            <div style={{color: 'gray'}}>
              { cartItem.variant ?
              <div>{cartItem.product.variant[cartItem.variant].label} (Rp {cartItem.product.variant[cartItem.variant].price.toLocaleString('id')})</div>
              : 
              ''} 
              { cartItem.modifier.length ?
                cartItem.modifier.map( (mod,index) => (
                  <div key={index}>{cartItem.product.modifier[mod].label} (+ Rp {cartItem.product.modifier[mod].price.toLocaleString('id')})</div>
                ))
              : ''} 
              {/* { cartItem.variant ? ' Rp ' : '' } 
              { cartItem.product.hasVariant ? cartItem.product.variant[cartItem.variant].price.toLocaleString('id') :  '' } */}
              <i>{ cartItem.note } </i>
            </div>
        </div>
        <div><strong>x{cartItem.quantity}</strong></div>
        <div><strong> { (cartItem.price*cartItem.quantity).toLocaleString('id')} </strong></div>            
        
        
    </div>
    )
    
}

