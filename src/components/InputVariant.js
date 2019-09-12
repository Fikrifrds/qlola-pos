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

export default function InputVariant(){
  const classes = useStyles();
    const [variants, setVariants] = useState([uuid.v4()]);
    const [count, setCount] = useState(1);
    const [data, setData] = useState({})

    function addInputVariant(){
        let vars = variants;
        vars.push(uuid.v4());
        console.log(variants);
        setVariants(vars);
        setCount(count+1)
    }

    function removeInputVariant(variant, index){
        let vars = variants;
        vars.splice(index, 1);
        setVariants(vars);
        setCount(count-1);
        let da = data;
        delete da[variant];
        setData(da);

    }

    function VariantName(e){
        let da = data;
        if(da[e.target.name]){
            if(da[e.target.name].label){
                da[e.target.name].label = e.target.value
            } else {
                da[e.target.name]['label'] = e.target.value
            }
        } else {
            da[e.target.name] = {
                label: e.target.valu
            }
        }
        
        setData(da);
    }

    function VariantPrice(e){
        let da = data;
        if(da[e.target.name]){
            if(da[e.target.name].price){
                da[e.target.name].price = Number(e.target.value)
            } else {
                da[e.target.name]['price'] = Number(e.target.value)
            }
        } else {
            da[e.target.name] = {
                price: Number(e.target.value)
            }
        }
        
        setData(da);
    }

    function check(){
        console.log(JSON.stringify(data))
    }

    return (
        <div>
        <div className="legend"><strong>JENIS VARIASI</strong></div>
                <TextField
                id="outlined-multiline-static"
                placeholder="Size"
                margin="normal"
                variant="outlined"
                type="text"
                
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
                  <IconButton>
                      { index === variants.length - 1 ?
                        <AddCircleOutline onClick={addInputVariant} color="primary" />
                            :
                        <RemoveCircleOutline onClick={ () => removeInputVariant(variant, index)} color="secondary" />
                    }
                      
                  </IconButton>
                </div>
        </div>
        ))}
        <hr/>
        </div>
    )
}