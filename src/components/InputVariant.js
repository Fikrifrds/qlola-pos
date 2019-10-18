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

export default function InputVariant({variantTitle, handleChange, variantData, setVariantData}){
  const classes = useStyles();
    const [variants, setVariants] = useState([uuid.v4()]);
    const [count, setCount] = useState(1);

    function addInputVariant(){
        let vars = variants;
        vars.push(uuid.v4());
        console.log(variants);
        setVariants(vars);
        setCount(count+1);
    }

    function removeInputVariant(variant, index){
        let vars = variants;
        vars.splice(index, 1);
        setVariants(vars);
        setCount(count-1);
        let da = variantData;
        delete da[variant];
        setVariantData(da);

    }

    function VariantName(e){
        let da = variantData;
        if(da[e.target.name]){
            da[e.target.name]['label'] = e.target.value
        } else {
            da[e.target.name] = {
                label: e.target.value
            }
        }
        
        setVariantData(da);
    }

    function VariantPrice(e){
        let da = variantData;
        if(da[e.target.name]){
            da[e.target.name]['price'] = Number(e.target.value)
        } else {
            da[e.target.name] = {
                price: Number(e.target.value)
            }
        }
        
        setVariantData(da);
    }

    return (
        <div>
        <div className="legend"><strong>JUDUL VARIASI</strong></div>
                <TextField
                id="outlined-multiline-static"
                placeholder="Size"
                margin="normal"
                variant="outlined"
                type="text"
                onChange={handleChange}
                value={variantTitle}
                name="variant-title"
                />
        { variants.map( (variant, index) => (
            <div key={variant} style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '10px'}}>
              <div className={classes.flexItem}>
                <div className="legend"><strong>Nama Variasi</strong></div>
                <TextField
                id="outlined-multiline-static"
                fullWidth
                margin="normal"
                variant="outlined"
                type="text"
                placeholder="Large"
                onChange={VariantName}
                name={variant}
                />
              </div>

              <div className={classes.flexItem}>
                <div className="legend"><strong>Harga</strong></div>
                <TextField
                id="outlined-multiline-static"
                fullWidth
                margin="normal"
                variant="outlined"
                placeholder="25000"
                type="number"
                onChange={VariantPrice}
                name={variant}

                />
              </div>
              <div className={classes.flexItem} style={{ paddingTop: '35px'}}>
                  
                      { index === variants.length - 1 ?
                        <IconButton onClick={addInputVariant}>
                            <AddCircleOutline color="primary" />
                        </IconButton>
                        :
                        <IconButton onClick={ () => removeInputVariant(variant, index)}>
                            <RemoveCircleOutline color="secondary" />
                        </IconButton>
                        }
                      
                  
                </div>
        </div>
        ))}
        <hr/>
        </div>
    )
}