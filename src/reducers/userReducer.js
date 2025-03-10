export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

  const addProductToCart = (product, state) => {
    console.log('Adding product', product);
    const updatedCart = [...state.cart];
    const updatedItemIndex = updatedCart.findIndex(
      item => item._id === product._id
    );

    if (updatedItemIndex < 0) {
      updatedCart.push({ ...product, quantity: 1 });
    } else {
      const updatedItem = {
        ...updatedCart[updatedItemIndex]
      };
      updatedItem.quantity++;
      updatedCart[updatedItemIndex] = updatedItem;
    }
    localStorage.setItem('carts', JSON.stringify(updatedCart));
    return { ...state, cart: updatedCart};
  };

  const removeProductFromCart = (productId, state) => {
    console.log('Removing product with id: ' + productId);
    const updatedCart = [...state.cart];
    const updatedItemIndex = updatedCart.findIndex(
      item => item._id === productId
    );

    const updatedItem = {
      ...updatedCart[updatedItemIndex]
    };
    updatedItem.quantity--;
    if (updatedItem.quantity <= 0) {
      updatedCart.splice(updatedItemIndex, 1);
    } else {
      updatedCart[updatedItemIndex] = updatedItem;
    }
    localStorage.setItem('carts', JSON.stringify(updatedCart));
    return { ...state, cart: updatedCart};
  };

export const shopReducer = (state, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return addProductToCart(action.product, state);
        case REMOVE_PRODUCT:
            return removeProductFromCart(action.productId, state)
        default:
            return state;

    }
};
