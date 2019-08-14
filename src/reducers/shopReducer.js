import uuid from 'uuid';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const REMOVE_ALL_PRODUCT = 'REMOVE_ALL_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SEARCH_PRODUCT = 'SEARCH_PRODUCT';
export const CART_TO_BILL = 'CART_TO_BILL';
export const BILL_TO_CART = 'BILL_TO_CART';
export const CREATE_SALE = 'CREATE_SALE';
export const CREATE_SPLITTED_SALE = 'CREATE_SPLITTED_SALE';


  const addProductToCart = (input, state) => {
    console.log('Adding product', input);
    let updatedCart = state.cart;

    // const updatedItemIndex = updatedCart.findIndex(
    //   item => item._id === product._id
    // );

    // if (updatedItemIndex < 0) {
    //   updatedCart.push({ ...product, quantity: 1 });
    // } else {
    //   const updatedItem = {
    //     ...updatedCart[updatedItemIndex]
    //   };
    //   updatedItem.quantity++;
    //   updatedCart[updatedItemIndex] = updatedItem;
    // }

    if(state.cart._id){

      const checkInput = {
        productId: input.product._id,
        modifier: input.modifier,
        variant: input.variant,
        note: input.note
      }

      const filteredItem = updatedCart.items.filter(
        item => {
          const checkItem = {
            productId: item.product._id,
            modifier: item.modifier,
            variant: item.variant,
            note: item.note
          }
          return JSON.stringify(checkInput) === JSON.stringify(checkItem)
        }
      );
      
      if(filteredItem.length){
          const updatedItem = filteredItem[0];
          const updatedItemIndex = updatedCart.items.findIndex(
            item => item.product._id === updatedItem._id
          );
          updatedItem.quantity += input.quantity;
          updatedCart.items[updatedItemIndex] = updatedItem;
      } else {
        updatedCart.items.push(input);
      }
      
    } else {
      updatedCart = {
        _id: uuid.v4(),
        items : [input]
      }
    }
    
    

    localStorage.setItem('carts', JSON.stringify(updatedCart));
    return { ...state, cart: updatedCart};
  };

  const removeProductFromCart = (inputId, state) => {
    console.log('Removing product with id: ' + inputId);
    const updatedCart = state.cart;
    const updatedItemIndex = updatedCart.items.findIndex(
      item => item._id === inputId
    );

    // const updatedItem = {
    //   ...updatedCart[updatedItemIndex]
    // };
    
      updatedCart.items.splice(updatedItemIndex, 1);

    // updatedItem.quantity--;
    // if (updatedItem.quantity <= 0) {
    //   updatedCart.splice(updatedItemIndex, 1);
    // } else {
    //   updatedCart[updatedItemIndex] = updatedItem;
    // }
    if(updatedCart.items.length){
      localStorage.setItem('carts', JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart};
    } else {
      localStorage.removeItem('carts');
      return { ...state, cart: { items:[], _id: null, name: null} };
    }
    
  };

  const removeProductsInCart = state => {
      localStorage.removeItem('carts');
      return { ...state, cart: { items:[], _id: null, name: null} };
  };

  const updateProductInCart = (itemId, input, state) => {
    console.log('Updating product with id: ' + itemId);
    const updatedCart = state.cart;
    const updatedItem = updatedCart.items.find(
      item => item._id === itemId
    );
    console.log('updatedItem', updatedItem, 'input' ,input);

    for ( let key in input ){
        updatedItem[key] = input[key]
    }
    // const updatedItem = {
    //   ...updatedCart[updatedItemIndex]
    // };

    // updatedItem.quantity--;
    // if (updatedItem.quantity <= 0) {
    //   updatedCart.splice(updatedItemIndex, 1);
    // } else {
    //   updatedCart[updatedItemIndex] = updatedItem;
    // }
    
    localStorage.setItem('carts', JSON.stringify(updatedCart));
    return { ...state, cart: updatedCart};
  };

  const saveCartToBill = state => {
    console.log('Save cart to bill');
    const updatedBills = [...state.bills];

    const updatedBillIndex = updatedBills.findIndex(
      item => item._id === state.cart._id
    );

    if(updatedBillIndex < 0){
      const name = prompt("Please enter bill name");
      if(name){
        const cart = {
          _id: state.cart._id,
          items: state.cart.items,
          name: name
        }
        updatedBills.push(cart);
      } else {
        return state
      }
      
    } else {
      updatedBills[updatedBillIndex].items = state.cart.items
    }

    
    localStorage.setItem('bills', JSON.stringify(updatedBills));
    localStorage.removeItem('carts');
    return { ...state, cart: { items: [], _id: null, name:null}, bills: updatedBills};
  };

  const billToCart = (bill, state) => {
    console.log('bill to cart');
    console.log(bill)
    
    if(state.cart._id){
      if(state.cart._id === bill._id){
        alert('Bill you select is already in cart.');
      } else {
        if( window.confirm('Do you want to open saved bill ? There es an existing cart. Save it first or it will be removed.') ){
          localStorage.setItem('carts', JSON.stringify(bill));
        } else {
          return state;
        }
      }
      
    } else {
      localStorage.setItem('carts', JSON.stringify(bill)); 
    }
       
    return { ...state, cart: bill  };
  };

  const createSale = state => {
    const updatedBills = [...state.bills];
    const updatedBillIndex = updatedBills.findIndex(
      item => item._id === state.cart._id
    );
    if(updatedBillIndex >= 0){
      updatedBills.splice(updatedBillIndex,1);
      localStorage.setItem('bills', JSON.stringify(updatedBills));
    }
    localStorage.removeItem('carts');
    return { ...state, cart: { items: [], _id: null, name:null}, bills: updatedBills};
  }

const createSplittedSale = (_ids, state) => {
  
  let updatedCart = state.cart;

  // let updatedBills = state.bills;
  // const updatedBillIndex = updatedBills.findIndex(
  //   item => item._id === updatedCart._id
  // );
  // if(updatedBillIndex >= 0){
  //   for (let id of _ids){
  //     const updatedItemIndex = updatedBills[updatedBillIndex].items.findIndex(
  //         item => item._id === id
  //     );
  //     if(updatedItemIndex >= 0){
  //       updatedBills[updatedBillIndex].items.splice(updatedItemIndex, 1);
        
  //     }
  //   }
    
    
  // }

  for (let id of _ids){
      const updatedItemIndex = updatedCart.items.findIndex(
          item => item._id === id
      );
      if(updatedItemIndex >= 0){
        updatedCart.items.splice(updatedItemIndex, 1);
      }
    
  }
  
  localStorage.setItem('carts', JSON.stringify(updatedCart));
  return { ...state, cart: updatedCart};
}

export const shopReducer = (state, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return addProductToCart(action.product, state);
        case REMOVE_PRODUCT:
            return removeProductFromCart(action.productId, state);
        case REMOVE_ALL_PRODUCT:
          return removeProductsInCart(state);
        case UPDATE_PRODUCT:
            return updateProductInCart(action.itemId, action.input, state);
        case CART_TO_BILL:
          return saveCartToBill(state);
        case BILL_TO_CART:
          return billToCart(action.bill, state);
        case CREATE_SALE:
          return createSale(state);
        case CREATE_SPLITTED_SALE:
          return createSplittedSale(action._ids, state);
        default:
            return state;

    }
};
