import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
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
  },
}));

export default function ChooseModifier({ modifier, setModifier, options, extra, setExtra, title }) {
  const mediaContext = useContext(MediaQueryContext);
  const {isDesktopOrLaptop, isBigScreen, isMobileDevicePortrait, isTabletOrMobileDevice, isPortrait, isRetina } = mediaContext.media;
  
  const classes = useStyles();

  const change = value => {
    let mods = [...modifier];
    if(modifier.includes(value)){
      const index = modifier.findIndex( item => item === value );
      mods.splice(index,1);
    } else {
      mods = [...modifier, value]
    }
    
    setModifier(mods);
    let exs = 0
    for (let mod of mods){
      exs += options[mod].price
    }
    setExtra(exs);
  };

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <div className="legend"><strong>{title.toUpperCase()}</strong> | <span>PILIH BEBERAPA</span></div>
        <div className='button-group' style={{ justifyContent: isMobileDevicePortrait && 'center' }}>
        { Object.keys(options).map( (key, index) => (
        <div name="modifier" value={modifier} 
          onClick={ () => change(key)} key={index} className={`custom-button ${ modifier.includes(key) ? 'contained' : 'outlined'}`}>
          {options[key].label}
        </div>
        ))}
        </div>
      </FormControl>
    </div>
  );

}