import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
}));

export default function ChooseVariant2({ variant, setVariant, options, setVariantPrice, title }) {
  const classes = useStyles();

  const change = value => {
    setVariant(value);
    setVariantPrice(options[value].price);
  };

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <div className="legend"><strong>{title.toUpperCase()}</strong> | <span>PILIH SALAH SATU</span></div>
        <div className='button-group'>
        { Object.keys(options).map( (key, index) => (
        <div name="variant" value={variant} 
          onClick={ () => change(key)} key={index} className={`custom-button ${ key === variant ? 'contained' : 'outlined'}`}>
          {options[key].label}
        </div>
        ))}
        </div>
      </FormControl>
    </div>
  );

}