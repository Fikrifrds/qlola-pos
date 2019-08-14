import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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

export default function ChooseVariation({ variation, setVariation, options, setVariationPrice }) {
  const classes = useStyles();
 
  const change = async event => {
    setVariation(event.target.value);
    setVariationPrice(options[event.target.value].price);
  };

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">VARIATION</FormLabel>
        <RadioGroup
          aria-label="Variation"
          name="variation"
          className={classes.group}
          value={variation}
          onChange={change}
        >
        { Object.keys(options).map( (key, index) => (
            <FormControlLabel 
            key={index} 
            value={key} 
            control={<Radio />} 
            label={`${options[key].label} (Rp ${options[key].price.toLocaleString('id')})`} />
        ))}
          
        </RadioGroup>
        <FormHelperText>Choose One</FormHelperText>
      </FormControl>
    </div>
  );

}