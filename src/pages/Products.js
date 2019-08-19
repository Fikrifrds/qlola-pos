import React, { useState, useContext, useEffect } from 'react';
import MediaQuery from 'react-responsive';
import { ProductContext } from '../context/ProductContextProvider';
import { GlobalContext } from '../context/GlobalContextProvider';
import { ShopContext } from '../context/ShopContextProvider';
import './Products.css';
import CartPage from './Cart';
import SelectCategory from '../components/SelectCategory';
import ItemCard from '../components/ItemCard';
import ItemCardList from '../components/ItemCardList';
import NewItem from '../components/NewItem';
import SearchBoxV2 from '../components/SearchBoxV2';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GridOn from '@material-ui/icons/GridOn';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import uuid from 'uuid';
import { MediaQueryContext } from '../context/MediaQueryContextProvider';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  }
}));

const ProductsPage = props => {
  const mediaContext = useContext(MediaQueryContext);
  const {isDesktopOrLaptop, isBigScreen, isTabletOrMobile, isTabletOrMobileDevice, isPortrait, isRetina } = mediaContext.media;

  const context = useContext(ProductContext);
  const globalContext = useContext(GlobalContext);
  const shopContext = useContext(ShopContext);
  console.log('productContext', context)

  const [open, setOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState({});
  const [isGrid, setIsGrid] = useState(JSON.parse(localStorage.getItem('isGrid')));
  const [ products, setProducts ] = useState(context.products);
  const [searchField, setSearchField] = useState('');

  const changeView = (value) => {
    setIsGrid(JSON.parse(value));
    localStorage.setItem('isGrid', value);
  }

  const handleClickOpen = card => {
    setClickedItem(card);
    setOpen(true);
    globalContext.showAlert('asda','info')
  };


  useEffect(() => {
      setProducts(context.products);    
  }, [context.selectCategory])

  const classes = useStyles();

    const handleSubmit = product => {
      const input = {
        _id: uuid.v4(),
        product: product,
        quantity: 1,
        price: product.price,
        variantPrice : product.price,
        extra: 0,
        variant: null,
        modifier : []
      }
      shopContext.addProductToCart(input);
    }

    return (
          <React.Fragment>
          <CssBaseline />
          <main>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={2}>
          <Grid item xs={ !isPortrait ? 7 : 12 }>
            <div style={{ display:'flex', justifyContent: 'space-between', paddingBottom: '15px'}}>
              <div>
                {/* <SearchBox width="200px"/> */}
                <GridOn style={{color: `${isGrid ? 'lightgray' : ''}`, cursor: 'pointer'}} onClick={() => changeView(false)}/>
                <FormatListBulleted style={{color: `${isGrid ? '' : 'lightgray'}`, cursor: 'pointer'}} onClick={() => changeView(true)} />
                
              </div>
              <div>
              <SearchBoxV2 searchField={searchField} setSearchField={setSearchField} />
              {/* <Button onClick={handleClickOpenSelectCategory}>Semua</Button> */}
              <span style={{ marginLeft: '7px'}}>
                <SelectCategory />
              </span>
              
              </div>
              
            </div>
          { products.length ? 
            <Grid container spacing={2}>
            
              { products.filter( product => product.name.toLowerCase().includes(searchField.toLowerCase())).map(product => (
                      isGrid ?
                      <ItemCardList
                        key={product._id}
                        onclick= { product.hasVariant || product.hasModifier ? () => handleClickOpen(product) : () => handleSubmit(product) }
                        product={product}
                      />
                      :
                      <ItemCard 
                        key={product._id}
                        onclick= { product.hasVariant || product.hasModifier ? () => handleClickOpen(product) : () => handleSubmit(product) }
                        product={product} 
                      />
                  ))}
            </Grid>
            :
            <div style={{ textAlign: 'center'}}>No product</div>
          }
          <NewItem product={clickedItem} open={open} setOpen={setOpen} />
        </Grid>
        { !isPortrait ? 
          <Grid item xs={5} >
              <CartPage />
        </Grid> :''
        }
        
        </Grid>
        
        </Container>
        </main>
          </React.Fragment>
      )        
  }

export default ProductsPage;
