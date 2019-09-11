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
import ChooseEdc from './ChooseEdc';
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Success from './Success';

import uuid from "uuid";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CheckOut({ open, setOpen, price, isMobileDevicePortrait }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const context = useContext(ShopContext);
  const [method, setMethod] = useState(null);
  const [cash, setCash] = useState(null);
  const [edcBank, setEdcBank] = useState(null);
  const [edcBankInput, setEdcBankInput] = useState(null);
  const [cashInput, setCashInput] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [readyToPay, setReadyToPay] =useState(false);

  const clearFields = () => {
    setCash(null);
    setCashInput('');
    setMethod(null);
    setEdcBank(null);
    setEdcBankInput('');
    localStorage.removeItem('price');
    localStorage.removeItem('change');
  }

  const handleClose = () => {
    setOpen(false);
    clearFields();
  }

  const handleSubmit = async () => {
    localStorage.setItem('change', cashInput ? Number(cashInput)-price : cash-price );
    localStorage.setItem('price', price);
    localStorage.setItem('edcBank', edcBank ? edcBank : edcBankInput);
    setOpenSuccess(true);
    setOpen(false);
    setReadyToPay(false);
    setMethod(null);
    context.createSale({
      data: {
      method: method,
      price: price,
      cashAmount : method === 'cash' ? cash ? cash: Number(cashInput) : null,
      edcBank: method === 'edc' ? edcBank ? edcBank : edcBankInput : null
      }
    });
  }

    const scroll = 'paper';
    const fullWidth = true
    const maxWidth = 'sm';

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        scroll={scroll}
        fullWidth={fullWidth}
        fullScreen={fullScreen}
        maxWidth={maxWidth}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
      <DialogActions style={{ display: 'flex', justifyContent:'space-around'}}>
        { isMobileDevicePortrait ?
            <IconButton onClick={handleClose} variant="outlined" color="primary">
              <Close />
          </IconButton> :
          <Button onClick={handleClose} variant="outlined" color="primary">
            Cancel
          </Button>
        }
          <DialogTitle id="scroll-dialog-title">
          <strong>
          Rp { price.toLocaleString('id') }
          </strong>
        </DialogTitle>
          <Button 
          onClick={ readyToPay ? handleSubmit : () => {}} variant="contained" color="primary" 
          disabled={ readyToPay ? false : true}
          >
            Pay
          </Button>
        </DialogActions>
        <Divider />
        <DialogContent dividers={scroll === 'paper'}>

            <ChooseCashAmountV2
          setCash={setCash}
          cashInput={cashInput} 
          setCashInput={setCashInput}
          price={price}
          setReadyToPay={setReadyToPay}
          setMethod={setMethod}
          edcBankInput={edcBankInput}
          setEdcBank={setEdcBank}
          setEdcBankInput={setEdcBankInput}
          />

        </DialogContent>
      </Dialog>
      <Success clearFields={clearFields} 
      openSuccess={openSuccess} setOpenSuccess={setOpenSuccess} 
      price={price} change={ cashInput ? Number(cashInput)-price : Number(cash)-price } />
    </div>
  );
}