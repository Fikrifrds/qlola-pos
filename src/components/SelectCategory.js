import React, {useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ProductContext } from '../context/ProductContextProvider';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

export default function SelectCategory() {
  const classes = useStyles();
    const context = useContext(ProductContext);
  const [value, setValue] = useState(localStorage.getItem('selectedCategory') || '');

  useState(() => {
    context.selectCategory(value);
  },[])
  const handleChange = event => {
    setValue(event.target.value);
    context.selectCategory(event.target.value);
    localStorage.setItem('selectedCategory', event.target.value);
  };

  return (
    <Select
        value={value}
        onChange={handleChange}
        input={<Input name="age" id="age-label-placeholder" />}
        displayEmpty
        name="age"
        className={classes.selectEmpty}
    >
    <MenuItem value="">
    <em>Semua</em>
    </MenuItem>
    <MenuItem value="favorite">
    <em>Favorite</em>
    </MenuItem>
    { context.category.map( (category, index) => (
        <MenuItem  key={index} value={category._id}>{category.name}</MenuItem>
    ))}
    
    </Select>
  );
}