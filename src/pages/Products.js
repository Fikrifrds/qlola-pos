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

  const classes = useStyles();

  const data = [
      {
    name: 'Tanner Linsley',
    age: 26,
    friend: {
      name: 'Jason Maurer',
      age: 23,
    }
  },
  {
    name: 'Tanner Linsley',
    age: 26,
    friend: {
      name: 'Jason Maurer',
      age: 23,
    }
  }]
 
  const columns = [{
    Header: 'Name',
    accessor: 'name' // String-based value accessors!
  }, {
    Header: 'Age',
    accessor: 'age',
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }, {
    id: 'friendName', // Required because our accessor is not a string
    Header: 'Friend Name',
    accessor: d => d.friend.name // Custom value accessors!
  }, {
    Header: props => <span>Friend Age</span>, // Custom header components!
    accessor: 'friend.age'
  }]

    return (
          <React.Fragment>
          <CssBaseline />
          <main>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={2}>

        </Grid>
        
        </Container>
        </main>
          </React.Fragment>
      )        
  }

export default ProductsPage;
