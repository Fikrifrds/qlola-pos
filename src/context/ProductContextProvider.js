import React, { useEffect, useState, useReducer } from 'react';
import { productReducer, SEARCH_PRODUCT, SELECT_CATEGORY } from '../reducers/productReducer';

export const ProductContext = React.createContext();

const ProductContextProvider = props => {


  const [productState, dispatch] = useReducer(productReducer,
    [], () => {
    return { products: [], category:[] }
  });

  // const searchProduct = searchInput => {
  //   dispatch({ type: SEARCH_PRODUCT, searchInput:searchInput });
  // };

  const selectCategory = inputCategory => {
    dispatch({ type: SELECT_CATEGORY, inputCategory:inputCategory });
  };

    return (
      <ProductContext.Provider
        value={{
          products: productState.products,
          category: productState.category,
          selectCategory: selectCategory
        }}
      >
        { props.children }
      </ProductContext.Provider>
    );
}

export default ProductContextProvider;
