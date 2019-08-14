import React, {useState} from 'react';
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
  }
}));

export default function ChooseCashAmount({ cash, setCash, cashInput, setCashInput, price }) {
  const classes = useStyles();
  const [ind, setInd] = useState(null);
 
  const options = generateCash(price);

  const changeRadio = value => {
    setCash(value);
    setInd(value)
  };

  const changeInput = async event => {
    setCash(null);
    setCashInput(event.target.value);
  };

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
      <div className="legend"><strong>CASH</strong></div>
        <div className='button-group'>
        { options.map( (option, index) => (
            <div 
            key={index} 
            value={`${option}`}
            onClick={ () => changeRadio(option)} 
            className={`custom-button ${ option === ind ? 'contained' : 'outlined'}`}
            >
            {`Rp ${Number(option).toLocaleString('id')}`}
            </div>
        ))}
        </div>
        <form noValidate autoComplete="off">
          <TextField
        id="outlined-number"
        value={cashInput}
        onChange={changeInput}
        type="number"
        onClick={() => setInd(null)}
        placeholder="Cash Amount"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        variant="outlined"
      />
      </form>
      </FormControl>
    </div>
  );

}