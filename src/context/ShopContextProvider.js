import React, { useEffect, useState, useReducer } from 'react';
import {
  shopReducer, 
  ADD_PRODUCT, 
  REMOVE_PRODUCT, 
  REMOVE_ALL_PRODUCT, 
  UPDATE_PRODUCT, 
  CART_TO_BILL, 
  BILL_TO_CART, 
  CREATE_SALE,
  CREATE_SPLITTED_SALE
} from '../reducers/shopReducer';

export const ShopContext = React.createContext();

const ShopContextProvider = props => {

  const [cartState, dispatch] = useReducer(shopReducer,
    [], () => {
    const carts = localStorage.getItem('carts');
    const bills = localStorage.getItem('bills');
    const sales = localStorage.getItem('sales');
    return { cart : carts ? JSON.parse(carts) : { items: [] }, bills: bills ? JSON.parse(bills) : [], sales: sales ? JSON.parse(sales) : [] }
  });

  const addProductToCart = product => {
      // setCart(updatedCart);
      dispatch({ type: ADD_PRODUCT, product: product })
  };

  const removeProductFromCart = productId => {
      dispatch({ type: REMOVE_PRODUCT, productId:productId });
  };

  const removeProductsInCart = productId => {
    dispatch({ type: REMOVE_ALL_PRODUCT, productId:productId });
};

  const updateProductInCart = (itemId, input) => {
    dispatch({ type: UPDATE_PRODUCT, itemId:itemId, input:input });
  };

  const saveCartToBill = () => {
    dispatch({ type: CART_TO_BILL });
  };

  const billToCart = bill => {
    dispatch({ type: BILL_TO_CART, bill:bill });
  };

  const createSale = () => {
    dispatch({ type: CREATE_SALE });
  };

  const createSplittedSale = _ids => {
    dispatch({ type: CREATE_SPLITTED_SALE, _ids:_ids });
  };

    return (
      <ShopContext.Provider
        value={{
          _id: cartState._id,
          cart: cartState.cart,
          bills: cartState.bills,
          sales: cartState.sales,
          addProductToCart: addProductToCart,
          removeProductFromCart: removeProductFromCart,
          removeProductsInCart: removeProductsInCart,
          updateProductInCart: updateProductInCart,
          saveCartToBill: saveCartToBill,
          billToCart:billToCart,
          createSale:createSale,
          createSplittedSale:createSplittedSale
        }}
      >
        {props.children}
      </ShopContext.Provider>
    );
}

export default ShopContextProvider;
