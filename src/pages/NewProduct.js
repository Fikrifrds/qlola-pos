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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CloudUpload from '@material-ui/icons/CloudUpload';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import uuid from 'uuid';
import { MediaQueryContext } from '../context/MediaQueryContextProvider';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';
import InputVariant from '../components/InputVariant';

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
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(8),
    backgroundColor: theme.palette.background.paper,
  },
  grid: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(5),
    paddingBottom: theme.spacing(8)
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
  },
  flexItem: {
      paddingTop: '10px'
  },
  input: {
    display: 'none',
  },
  upload: {
    marginTop: theme.spacing(2),
    cursor: 'pointer'
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

  const [ imgUrl, setImgUrl ] = useState('');
  const [hasVariant, setHasVariant] = useState(false);

  const handleSwitch = e => {
      setHasVariant(!hasVariant);
  }

  function handleImageUpload(e){
    console.log(e.target.files)
  }

    return (
          <main>
        <Container className={classes.cardGrid} maxWidth="lg">
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <Link to="/products">
                <IconButton size="medium">
                    <ArrowBack />
                </IconButton>
                
                </Link>
                <Button size="small" variant="contained" color="primary">Save</Button>
            </div>
            
          <Grid container spacing={2} className={classes.grid}>
          <div component="fieldset" className={classes.formControl}>
              
          <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'space-between'}}>
              <div className={classes.flexItem}>
                <div className="legend"><strong>NAMA BARANG</strong></div>
                <TextField
                id="outlined-multiline-static"
                
                margin="normal"
                variant="outlined"
                type="text"
                />
              </div>
            
              
              <div className={classes.flexItem}>
                <FormControlLabel
                control={<Switch color="primary" checked={hasVariant} onChange={handleSwitch} value={hasVariant} />}
                label="Variasi Harga"
                />
            </div>

            
            { hasVariant ? 
                <div className={classes.flexItem}>
            <InputVariant />
            </div>
            :
            <div className={classes.flexItem}>
                <div className="legend"><strong>HARGA</strong></div>
                <TextField
                id="outlined-multiline-static"
                
                className={classes.textField}
                margin="normal"
                variant="outlined"
                type="number"
                />
                </div>
                }
            
                <div className={classes.flexItem}>
                <div className="legend"><strong>UPLOAD FOTO</strong>
                </div>

                <input
                    accept="image/*"
                    className={classes.input}
                    id="outlined-button-file"
                    type="file"
                    onChange={handleImageUpload}
                />
      <label htmlFor="outlined-button-file">
          <img className={classes.upload} src={imgUrl ? imgUrl : "https://ruang-tekkim.herokuapp.com/images/no-image.png" } alt="upload" width="120px"/>
        {/* <IconButton variant="contained" component="span" className={classes.button}>
          <CloudUpload color="primary"/>
        </IconButton> */}
    </label>
        </div>
            </div>
                        
                    </div>
        </Grid>
        
        </Container>
        </main>
      )        
  }

export default ProductsPage;
