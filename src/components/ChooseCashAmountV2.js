import React, {useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import generateCash from '../formula/change';
import { MediaQueryContext } from '../context/MediaQueryContextProvider';

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

 function Edc({ price, setInd, ind, setCash, edcBankInput, setReadyToPay,setMethod, setEdcBank, setEdcBankInput }){
  const mediaContext = useContext(MediaQueryContext);
  const {isDesktopOrLaptop, isBigScreen, isMobileDevicePortrait, isTabletOrMobileDevice, isPortrait, isRetina } = mediaContext.media;
  const classes = useStyles();

  const edcOptions = ['BCA', 'BNI', 'Mandiri'];
  
  const changeRadioEdc = (value, index) => {
    setMethod('edc');
    setEdcBank(value);
    setReadyToPay(true);
    setCash(null);
    setInd(value);
  };

  const changeInputEdc = async event => {
    setMethod('edc');
    setCash(null);
    setInd(null);
    setEdcBank(null);
    if(event.target.value){
      setReadyToPay(true);
      setEdcBankInput(event.target.value)
    } else {
      setReadyToPay(false);
    }
  };

  const handleClickInputEdc = () => {
    setInd(null);
    setReadyToPay(false);
  }

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
      <div className="legend"><strong>EDC</strong></div>
        <div className='button-group' style={{ justifyContent: isMobileDevicePortrait && 'center' }}>
        { edcOptions.map( (option, index) => (
            <div 
            key={index} 
            value={option}
            onClick={ () => changeRadioEdc(option, index)} 
            className={`custom-button ${ option === ind ? 'contained' : 'outlined'}`}
            >
            {option}
            </div>
        ))}
        </div>
        <form noValidate autoComplete="off">
          <TextField
        id="outlined-number"
        value={edcBankInput}
        onChange={changeInputEdc}
        type="text"
        onClick={handleClickInputEdc}
        placeholder="Lainnya"
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

export default function ChooseCashAmount({ setCash, cashInput, setCashInput, price, setReadyToPay, setMethod, edcBankInput, setEdcBank, setEdcBankInput  }) {
  const mediaContext = useContext(MediaQueryContext);
  const {isDesktopOrLaptop, isBigScreen, isMobileDevicePortrait, isTabletOrMobileDevice, isPortrait, isRetina } = mediaContext.media;

  const classes = useStyles();
  const [ind, setInd] = useState(null);
 
  const options = generateCash(price);

  const changeRadio = value => {
    setMethod('cash');
    setCash(value);
    setReadyToPay(true);
    setInd(value)
  };

  const changeInput = async event => {
    setMethod('cash');
    setCash(null);
    setInd(null);
    event.target.value >= price ? setReadyToPay(true): setReadyToPay(false) ;
    setCashInput(event.target.value);
  };

  const handleClickInput = () => {
    setInd(null);
    setReadyToPay(false);
  }

  return (
    <>
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
      <div className="legend"><strong>CASH</strong></div>
        <div className='button-group' style={{ justifyContent: isMobileDevicePortrait && 'center' }}>
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
        onClick={handleClickInput}
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
    <Edc price={price} setInd={setInd} ind={ind} setCash={setCash} setReadyToPay={setReadyToPay} 
    setMethod={setMethod} edcBankInput={edcBankInput} setEdcBank={setEdcBank} 
    setEdcBankInput={setEdcBankInput}
    />
    </>
  );

}