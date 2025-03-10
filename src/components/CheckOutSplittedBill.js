import React, { useContext, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';
import { ShopContext } from '../context/ShopContextProvider';
import ChooseCashAmountV2 from './ChooseCashAmountV2';

import Success from './Success';

import uuid from "uuid";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CheckOutSplittedBill({ openCheckOut, setOpenCheckOut, price, splittemItems, handleCloseSplitBill }) {
    const context = useContext(ShopContext);
  const [cash, setCash] = useState(null);
  const [cashInput, setCashInput] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false)

  const clearFields = () => {
    setCash(null);
    setCashInput('');
    localStorage.removeItem('price');
    localStorage.removeItem('change');
  }

  const handleClose = () => {
    setOpenCheckOut(false);
    clearFields();
  }

  const handleSubmit = _ids => {
    localStorage.setItem('change', cashInput ? Number(cashInput)-price : Number(cash)-price );
    localStorage.setItem('price', price);
    setOpenSuccess(true);
    setOpenCheckOut(false);
    console.log(_ids);
    context.createSplittedSale(_ids);
  }

    const scroll = 'paper';
    const fullWidth = true
    const maxWidth = 'sm';

  return (
    <div>
      <Dialog
        open={openCheckOut}
        TransitionComponent={Transition}
        scroll={scroll}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
      <DialogActions style={{ display: 'flex', justifyContent:'space-around'}}>
          <Button onClick={handleClose} variant="outlined" color="primary">
            Cancel
          </Button>
          <DialogTitle id="scroll-dialog-title">
          <strong>
          Rp { price.toLocaleString('id') }
          </strong>
        </DialogTitle>
          <Button onClick={ cash || cashInput ? () => handleSubmit(splittemItems) : () => {}} variant="contained" color="primary" disabled={ cash || cashInput >= price ? false : true}>
            Pay
          </Button>
        </DialogActions>
        <Divider />
        <DialogContent dividers={scroll === 'paper'}>

            <ChooseCashAmountV2 
          cash={cash} 
          setCash={setCash}
          cashInput={cashInput} 
          setCashInput={setCashInput}
          price={price}
          />
        </DialogContent>
      </Dialog>
      <Success clearFields={clearFields} 
      openSuccess={openSuccess} setOpenSuccess={setOpenSuccess} 
      price={price} change={ cashInput ? Number(cashInput)-price : Number(cash)-price } />
    </div>
  );
}