import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
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

export default function SearchBox({ searchField, setSearchField}) {
  const classes = useStyles();
  // const context = useContext(ProductContext);


  const handleChange = e => {
    setSearchField(e.target.value);
    // context.searchProduct(e.target.value);
  }

  return (
    <TextField
        id="standard-search"
        type="search"
        className={classes.textField}
        placeholder="Cari Item..."
        value={searchField}
        onChange={handleChange}
    />
  );
}