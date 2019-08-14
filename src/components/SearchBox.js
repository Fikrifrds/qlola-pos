import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import DirectionsIcon from '@material-ui/icons/Directions';
import { ProductContext } from '../context/ProductContextProvider';


const useStyles = makeStyles({
  root: {
    padding: '1px 4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  }
});

export default function SearchBox() {
  const classes = useStyles();
  const context = useContext(ProductContext);

  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value);
    context.searchProduct(e.target.value);
  }

  const clearSearchInput = () => {
    setValue('');
    context.searchProduct('');
  }

  return (
    <>
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Cari Item..."
        inputProps={{ 'aria-label': 'search products' }}
        value={value}
        onChange={handleChange}
      />
      { value ? 
      <Close style={{ color: 'gray'}} className="pointer" onClick={clearSearchInput} />
      : '' }
    </Paper>
    <div>
      
    
    </div>
        
    </>
  );
}