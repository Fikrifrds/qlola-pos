import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  formControl: {
    margin: theme.spacing(3),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

export default function InputQuantity({ quantity, setQuantity, isMobileDevicePortrait, defaultValue}) {
  const classes = useStyles();

  const change = event => {
      setQuantity(event.target.value);
  };

  return (
    <div component="fieldset" className={classes.formControl}>
      <div className="legend"><strong>JUMLAH</strong></div>
        <div style={{ display: 'flex', justifyContent: 'flex-start'}}>
          <TextField
          id="outlined-number"
          value={quantity}
          defaultValue = {defaultValue}
          onChange={change}
          type="text"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          variant="outlined"
          />
          <div className="button-group">
            <div className={` ${isMobileDevicePortrait ? 'small-quantity-button' : 'quantity-button'} quantity-outlined`} onClick={() => quantity > 1 ? setQuantity( quantity - 1 ) : ''}><Remove /></div>
            <div className={` ${isMobileDevicePortrait ? 'small-quantity-button' : 'quantity-button'} quantity-outlined`} onClick={() => setQuantity( quantity + 1 )}><Add /></div>
          </div>
        </div>
      </div>
  );
}