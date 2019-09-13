export const SELECT_CATEGORY = 'SELECT_CATEGORY';

const imgUrl1 = 'https://ik.imagekit.io/qlola/tr:w-200/products/americano.jpeg';
const imgUrl2 = 'https://ik.imagekit.io/qlola/tr:w-200/products/sandwich.jpg';
const imgUrl3 = 'https://ik.imagekit.io/qlola/tr:w-200/products/tea.jpg';
const imgUrl4 = 'https://ik.imagekit.io/qlola/tr:w-200/products/cappuccino.jpg';
const products = [
  { _id: '1aa', 
  isFavorite: true,
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
  isFavorite: false,
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
  isFavorite: true,
  hasVariant: false, 
  hasModifier: false,
  category: 'tea',
  variant: {}, variantDefault: '', description: 'Let Google help apps determine location.' },
  { _id: '4dd', name: 'Cappuccino Extra Coffee', price: 40000, imgUrl: imgUrl4, 
  hasVariant: false, 
  isFavorite: false,
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
  isFavorite: true,
  category: 'coffee',
  description: 'Let Google help apps determine location.',
  modifierTitle: 'Dekorasi',
  hasModifier: false
  },
  { _id: '6sd', name: 'Smoked Beed & Mozarella Bitterballen', price: 38000, imgUrl: imgUrl4, 
  hasVariant: false, 
  isFavorite: true,
  category: 'coffee',
  description: 'Let Google help apps determine location.',
  modifierTitle: 'Dekorasi',
  hasModifier: false
},
{ _id: '8sd', name: 'Smoked Beed & Mozarella Bitterballen', price: 38000, imgUrl: imgUrl4, 
  hasVariant: false, 
  isFavorite: false,
  category: 'coffee',
  description: 'Let Google help apps determine location.',
  modifierTitle: 'Dekorasi',
  hasModifier: false
},
{ _id: '9sd', name: 'Smoked Beed & Mozarella Bitterballen', price: 38000, imgUrl: imgUrl4, 
  hasVariant: false, 
  isFavorite: false,
  category: 'coffee',
  description: 'Let Google help apps determine location.',
  modifierTitle: 'Dekorasi',
  hasModifier: false
},
{ _id: '10sd', name: 'Smoked Beed & Mozarella Bitterballen', price: 38000, imgUrl: imgUrl4, 
  hasVariant: false, 
  isFavorite: false,
  category: 'coffee',
  description: 'Let Google help apps determine location.',
  modifierTitle: 'Dekorasi',
  hasModifier: false
}
]

  // const searchProduct = (searchInput, state) => {
  //   const data = state.products;
  //   const filteredProducts = data.filter( product => product.name.toLowerCase().includes(searchInput.toLowerCase()));
  //   console.log('filteredProducts', filteredProducts)
  //   return { ...state, searchProducts: filteredProducts};
  // }

  const selectCategory = (inputCategory, state) => {
    const data = products;
    const filteredProducts = inputCategory ? inputCategory === 'favorite' ? data.filter( product => product.isFavorite) : data.filter( product => product.category === inputCategory) : data;
    console.log('filteredProducts', filteredProducts);
    return { ...state, products: filteredProducts};
  }

export const productReducer = (state, action) => {
    switch (action.type) {
        case SELECT_CATEGORY:
          return selectCategory(action.inputCategory, state);
        default:
          return state;
    }
};
