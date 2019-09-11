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

export default function ChooseEdc({ cash, setCash, cashInput, setCashInput, price }) {
  const mediaContext = useContext(MediaQueryContext);
  const {isDesktopOrLaptop, isBigScreen, isMobileDevicePortrait, isTabletOrMobileDevice, isPortrait, isRetina } = mediaContext.media;

  const classes = useStyles();
  const [ind, setInd] = useState(null);
 
  const edcOptions = ['BCA', 'BNI', 'Mandiri'];

  const changeRadioEdc = (value, index) => {
    setCash(value);
    setInd(value)
  };

  const changeInputEdc = async event => {
    setCash(null);
    setCashInput(event.target.value);
  };

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
        value={cashInput}
        onChange={changeInputEdc}
        type="text"
        onClick={() => setInd(null)}
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