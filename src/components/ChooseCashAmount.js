import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import generateCash from '../formula/change';

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

export default function ChooseCashAmount({ cash, setCash, cashInput, setCashInput, price }) {
  const classes = useStyles();
 
  const options = generateCash(price);

  const changeRadio = async event => {
    setCash(event.target.value);
  };

  const changeInput = async event => {
    setCash(null);
    setCashInput(event.target.value);
  };

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">CASH</FormLabel>
        <RadioGroup
          aria-label="Cash"
          name="cash"
          className={classes.group}
          value={cash}
          onChange={changeRadio}
        >
        { options.map( (option, index) => (
            <FormControlLabel 
            key={index} 
            value={`${option}`}
            control={<Radio />} 
            label={`Rp ${Number(option).toLocaleString('id')}`} />
        ))}
          
        </RadioGroup>

          <TextField
        id="outlined-number"
        value={cashInput}
        onChange={changeInput}
        type="number"
        placeholder="Cash Amount"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        variant="outlined"
      />
      </FormControl>
    </div>
  );

}