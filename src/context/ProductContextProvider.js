import React, { useEffect, useState, useReducer } from 'react';
import { productReducer, SEARCH_PRODUCT, SELECT_CATEGORY } from '../reducers/productReducer';

export const ProductContext = React.createContext();

const ProductContextProvider = props => {
  const imgUrl1 = 'https://ik.imagekit.io/qlola/tr:w-200/products/americano.jpeg';
  const imgUrl2 = 'https://ik.imagekit.io/qlola/tr:w-200/products/sandwich.jpg';
  const imgUrl3 = 'https://ik.imagekit.io/qlola/tr:w-200/products/tea.jpg';
  const imgUrl4 = 'https://ik.imagekit.io/qlola/tr:w-200/products/cappuccino.jpg';
  const products = [
    { _id: '1aa', 
    isFavourite: true,
    name: 'Americano', 
    price: 20000, 
    imgUrl: imgUrl1,
    category: 'coffee',
    hasVariant: true,
    hasModifier: false,
    variant: {
      '111' : { label: 'Reguler', price: 20000}, 
      '222': { label: 'Large', price: 30000}, 
      'asddd': { label: 'Extra Large', price: 120000},
      'abcs': { label: 'Super Large', price: 50000}
    },
    variantTitle: 'Ukuran',
    variantDefault: '111', 
    description: 'Let Google help apps determine location.' 
  },
    { _id: '2bb', name: 'Chicken Sandwich', price: 30000, imgUrl: imgUrl2, hasVariant: true, 
    isFavourite: false,
    category: 'snack',
    variant: { 'www' : { label: 'Double', price: 25000}, 'aaa': { label: 'Triple', price: 40000} }, 
    variantDefault: 'www', description: 'Let Google help apps determine location.',
    variantTitle: 'Variation',
    modifierTitle: 'Topping',
    hasModifier: true,
    modifier: {
      'keju' : { label: 'Keju', price: 5000}, 
      'telur': { label: 'Telur', price: 3000}
    }
    },
    { _id: '3cc', name: 'Green Tea', price: 25000, imgUrl: imgUrl3, 
    isFavourite: true,
    hasVariant: false, 
    hasModifier: false,
    category: 'tea',
    variant: {}, variantDefault: '', description: 'Let Google help apps determine location.' },
    { _id: '4dd', name: 'Cappuccino Extra Coffee', price: 40000, imgUrl: imgUrl4, 
    hasVariant: false, 
    isFavourite: false,
    category: 'coffee',
    description: 'Let Google help apps determine location.',
    modifierTitle: 'Dekorasi',
    hasModifier: true,
    modifier: {
      'flower' : { label: 'Flower', price: 5000}, 
      'leaf': { label: 'Leaf', price: 3000}
    }},
    { _id: '5sd', name: 'Chicken Basil Pesto Panini', price: 55000, imgUrl: imgUrl4, 
    hasVariant: false, 
    isFavourite: true,
    category: 'coffee',
    description: 'Let Google help apps determine location.',
    modifierTitle: 'Dekorasi',
    hasModifier: false
    },
    { _id: '6sd', name: 'Smoked Beed & Mozarella Bitterballen', price: 38000, imgUrl: imgUrl4, 
    hasVariant: false, 
    isFavourite: true,
    category: 'coffee',
    description: 'Let Google help apps determine location.',
    modifierTitle: 'Dekorasi',
    hasModifier: false
  },
  { _id: '8sd', name: 'Smoked Beed & Mozarella Bitterballen', price: 38000, imgUrl: imgUrl4, 
    hasVariant: false, 
    isFavourite: false,
    category: 'coffee',
    description: 'Let Google help apps determine location.',
    modifierTitle: 'Dekorasi',
    hasModifier: false
  },
  { _id: '9sd', name: 'Smoked Beed & Mozarella Bitterballen', price: 38000, imgUrl: imgUrl4, 
    hasVariant: false, 
    isFavourite: false,
    category: 'coffee',
    description: 'Let Google help apps determine location.',
    modifierTitle: 'Dekorasi',
    hasModifier: false
  },
  { _id: '10sd', name: 'Smoked Beed & Mozarella Bitterballen', price: 38000, imgUrl: imgUrl4, 
    hasVariant: false, 
    isFavourite: false,
    category: 'coffee',
    description: 'Let Google help apps determine location.',
    modifierTitle: 'Dekorasi',
    hasModifier: false
  }
  ]

  const category = [
    {_id: 'coffee', name: 'Coffee'},
    {_id: 'tea', name: 'Tea'},
    {_id: 'snack', name: 'Snack'},
    {_id: 'dessert', name: 'Dessert'},
    {_id: 'main-course', name: 'Main Course'}
  ]

  const [productState, dispatch] = useReducer(productReducer,
    [], () => {
    return { products: products, category:category }
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
