import React, { useState, useContext, useEffect } from 'react';
import MediaQuery from 'react-responsive';
import { ProductContext } from '../../context/ProductContextProvider';
import { GlobalContext } from '../../context/GlobalContextProvider';
import { ShopContext } from '../../context/ShopContextProvider';
import './Products.css';
import CartPage from '../Cart';
import SelectCategory from '../../components/SelectCategory';
import ItemCard from '../../components/ItemCard';
import ItemCardList from '../../components/ItemCardList';
import NewItem from '../../components/NewItem';
import SearchBoxV2 from '../../components/SearchBoxV2';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import GridOn from '@material-ui/icons/GridOn';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import uuid from 'uuid';
import { MediaQueryContext } from '../../context/MediaQueryContextProvider';
import ProductTable from './ProductTable'
import ReactTable from 'react-table';
import 'react-table/react-table.css'

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
    width: 200
  },
  text: {
    paddingLeft: '10px',
    paddingTop: '10px'
  }
}));
 
function Table({ searchField }){
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const productContext = useContext(ProductContext);

    useEffect(() => {
      setProducts(productContext.products); 
      setIsLoading(false);  
    }, [])
    // const data = [{
    //   name: 'Tanner Linsley',
    //   age: 26,
    //   friend: {
    //     name: 'Jason Maurer',
    //     age: 23,
    //   }
    // }]
   
    const columns = [{
      Header: 'Thumbnail',
      accessor: 'imgUrl', // String-based value accessors!
      Cell: props => <img src={props.value} alt="product" width="50px" />// Custom cell components!
    }, 
    {
      Header: 'Nama Produk',
      accessor: 'name' // String-based value accessors!
    }, 
    {
      Header: 'Harga',
      accessor: 'price',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      id: 'category', // Required because our accessor is not a string
      Header: 'Category',
      accessor: d => d.category // Custom value accessors!
    }, {
      id: 'completed',
      Header: props => <span>Completed</span>, // Custom header components!
      accessor: d => d.completed ? 'Yes' : 'No'
    }]
   
    return <ReactTable
      data={products.filter( el => el.name.toLowerCase().includes(searchField.toLowerCase()))}
      columns={columns}
      defaultPageSize={10}
      loading={isLoading}
    />
  }



const ProductsPage = props => {
  const mediaContext = useContext(MediaQueryContext);
  const {isDesktopOrLaptop, isBigScreen, isTabletOrMobile, isTabletOrMobileDevice, isPortrait, isRetina } = mediaContext.media;

  const context = useContext(ProductContext);
  const globalContext = useContext(GlobalContext);
  const shopContext = useContext(ShopContext);
  const [searchField, setSearchField] = useState('');
  console.log('productContext', context)

  const classes = useStyles();

    return (
          <main>
        <Container className={classes.cardGrid} maxWidth="lg">
                 
          
          <ProductTable searchField={searchField}/>
        </Container>
        </main>
      )        
  }

export default ProductsPage;
