import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import uuid from "uuid";

const useStyles = makeStyles(theme => ({
    root : {
        marginBottom: '20px'
    },
    flexItem: {
        paddingRight: '10px'
    }
  }));

export default function InputModifier({modifierTitle, handleChange, modifierData, setModifierData}){
  const classes = useStyles();
    const [modifiers, setModifiers] = useState([uuid.v4()]);
    const [count, setCount] = useState(1);

    function addInputModifier(){
        let vars = modifiers;
        vars.push(uuid.v4());
        console.log(modifiers);
        setModifiers(vars);
        setCount(count+1);
    }

    function removeInputModifier(modifier, index){
        let vars = modifiers;
        vars.splice(index, 1);
        setModifiers(vars);
        setCount(count-1);
        let da = modifierData;
        delete da[modifier];
        setModifierData(da);

    }

    function modifierName(e){
        let da = modifierData;
        if(da[e.target.name]){
            da[e.target.name]['label'] = e.target.value
        } else {
            da[e.target.name] = {
                label: e.target.value
            }
        }
        
        setModifierData(da);
    }

    function modifierPrice(e){
        let da = modifierData;
        if(da[e.target.name]){
            da[e.target.name]['price'] = Number(e.target.value)
        } else {
            da[e.target.name] = {
                price: Number(e.target.value)
            }
        }
        
        setModifierData(da);
    }

    return (
        <div>
        <div className="legend"><strong>JUDUL MODIFIER</strong></div>
                <TextField
                id="outlined-multiline-static"
                placeholder="Topping"
                margin="normal"
                variant="outlined"
                type="text"
                onChange={handleChange}
                value={modifierTitle}
                name="modifier-title"
                />
        { modifiers.map( (modifier, index) => (
            <div key={modifier} style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '10px'}}>
              <div className={classes.flexItem}>
                <div className="legend"><strong>Nama Modifier</strong></div>
                <TextField
                id="outlined-multiline-static"
                fullWidth
                margin="normal"
                variant="outlined"
                type="text"
                placeholder="Keju"
                onChange={modifierName}
                name={modifier}
                />
              </div>

              <div className={classes.flexItem}>
                <div className="legend"><strong>Harga</strong></div>
                <TextField
                id="outlined-multiline-static"
                fullWidth
                margin="normal"
                variant="outlined"
                placeholder="5000"
                type="number"
                onChange={modifierPrice}
                name={modifier}

                />
              </div>
              <div className={classes.flexItem} style={{ paddingTop: '35px'}}>
                    { index === modifiers.length - 1 ?
                        <IconButton onClick={addInputModifier}>
                            <AddCircleOutline color="primary" />
                        </IconButton>
                        :
                        <IconButton onClick={ () => removeInputModifier(modifier, index)}>
                            <RemoveCircleOutline color="secondary" />
                        </IconButton>
                        }
                      
                </div>
        </div>
        ))}
        </div>
    )
}