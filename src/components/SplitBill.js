import React, {useContext, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import DialogTitle from '@material-ui/core/DialogTitle';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { ShopContext } from '../context/ShopContextProvider'
import CheckOutSplittedBill from './CheckOutSplittedBill';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

export default function SplitBill({ openSplitBill, setOpenSplitBill, media }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const context = useContext(ShopContext);
  const [openCheckOut, setOpenCheckOut ] = useState(false);
  const [splittedAmount, setSplittedAmount] = useState(0);
  const [splittemItems, setSplittedItems]  = useState([]);

  for(let item of context.cart.items){
    
    if(splittemItems.includes(item._id)){
      item.isChecked = true;
    } else {
      item.isChecked = false;
    }
    
  }

  const handleChange = value => event => {
    let mods = [...splittemItems];
    const price = context.cart.items.find( item => item._id === value).price;

    if(splittemItems.includes(value)){
      const index = splittemItems.findIndex( item => item === value );
      mods.splice(index,1);
      setSplittedAmount(splittedAmount - price)
    } else {
      mods = [...splittemItems, value];
      setSplittedAmount(splittedAmount + price)
    }
    setSplittedItems(mods);
  };

  function handleCloseSplitBill() {
    setOpenSplitBill(false);
    setSplittedItems([]);
    setSplittedAmount(0);
  }

  const splitBill = ids => {
    context.createSplittedSale(ids);
    handleCloseSplitBill()
  }
  const scroll = 'paper';
    const fullWidth = true
    const maxWidth = 'sm';

  return (
    <div>
      <Dialog
        open={openSplitBill}
        onClose={handleCloseSplitBill}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        scroll={scroll}
        fullWidth={fullWidth}
        fullScreen={fullScreen}
        maxWidth={maxWidth}
      >
        <DialogActions style={{ display: 'flex', justifyContent:'space-between', flexWrap: 'wrap', margin: '0 30px 0 30px'}}>
        { media.isMobileDevicePortrait ?
            <IconButton onClick={handleCloseSplitBill} variant="outlined" color="primary">
              <Close />
          </IconButton> :
          <Button onClick={handleCloseSplitBill} variant="outlined" color="primary">
            Cancel
          </Button>
        }
          <DialogTitle id="scroll-dialog-title">
          <strong>
          Split Bill
          </strong>
          </DialogTitle>
          <Button variant="contained" color="primary" 
          disabled={ splittemItems.length ? false : true} 
          onClick = {() => splitBill(splittemItems)} >
            Split
          </Button>
        </DialogActions>
        <Divider />
        <CheckOutSplittedBill handleCloseSplitBill={handleCloseSplitBill} openCheckOut={openCheckOut} setOpenCheckOut={setOpenCheckOut} price={splittedAmount} splittemItems={splittemItems} />

        <DialogContent>
          <div
          style={{ 
            display: 'flex', 
            justifyContent:'space-between', 
            padding: '10px 10px 10px 10px', 
            margin: '15px 0px 15px 0px', 
            fontWeight: 'bold', 
            border: '2px solid lightgray',
            borderRadius: '5px'
          }}>
            <div>
              Total harga dipisah
            </div>
            <div>
              Rp {splittedAmount.toLocaleString('id')}
            </div>
          </div>
          <div style={{ paddingBottom: '10px'}}>Pilih item di bawah ini untuk dibayar terlebih dahulu!</div>
            <div className="bill-content">
              {context.cart.items.map( (cartItem, index) => (
                <div
                key={index}
                onClick={handleChange(cartItem._id)} 
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', paddingBottom: '10px'}}>
                  
                  <div>
                      <strong>{cartItem.product.name}</strong>
                      <div style={{color: 'gray'}}>
                        { cartItem.product.hasVariant ? 
                        <div>{cartItem.product.variant[cartItem.variant].label} (Rp {cartItem.product.variant[cartItem.variant].price.toLocaleString('id')})</div>
                        : ''} 
                        { cartItem.product.hasModifier ?
                          cartItem.modifier.map( (mod,index) => (
                            <div key={index}>{cartItem.product.modifier[mod].label} (+ Rp {cartItem.product.modifier[mod].price.toLocaleString('id')})</div>
                          ))
                        : ''} 
                        {/* { cartItem.variant ? ' Rp ' : '' } 
                        { cartItem.product.hasVariant ? cartItem.product.variant[cartItem.variant].price.toLocaleString('id') :  '' } */}
                        <i>{ cartItem.note } </i>
                      </div>
                  </div>
                  <div><strong>x{cartItem.quantity}</strong></div>
                  <div><strong> { (cartItem.price*cartItem.quantity).toLocaleString('id')} </strong></div>          
                  {/* <Checkbox
                    checked={cartItem.isChecked}
                    onChange={handleChange(cartItem._id)}
                    value={cartItem._id}
                    color="primary"
                  />                    */}
                  { splittemItems.includes(cartItem._id)  ? <CheckCircle color="primary" /> : <RadioButtonUnchecked color="primary" />}
                  
                  
                </div>
              ))}
            </div>
          
        </DialogContent>
      </Dialog>
    </div>
  );
}