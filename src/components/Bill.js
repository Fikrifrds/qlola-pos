import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Divider from '@material-ui/core/Divider';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ShopContext } from '../context/ShopContextProvider'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

export default function Bill({ open, setOpen, media }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const context = useContext(ShopContext)

  function handleClose() {
    setOpen(false);
  }

  const saveCartToBill = () => {
    context.saveCartToBill();
    handleClose();
  }

  const billToCart = bill => {
    context.billToCart(bill);
    handleClose();
  }

  const scroll = 'paper';
    const fullWidth = true
    const maxWidth = 'xs';

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        scroll={scroll}
        fullWidth={fullWidth}
        fullScreen={fullScreen}
        maxWidth={maxWidth}
      >
        <DialogActions style={{ display: 'flex', justifyContent:'space-between', flexWrap:'wrap', margin: '0 30px 0 30px'}}>
        { media.isMobileDevicePortrait ?
            <IconButton onClick={handleClose} variant="outlined" color="primary">
              <Close />
          </IconButton> :
          <Button onClick={handleClose} variant="outlined" color="primary">
            Cancel
          </Button>
        }
          <DialogTitle id="scroll-dialog-title">
          <strong>
          Bill Aktif ({context.bills.length})
          </strong>
          </DialogTitle>
          <Button variant="contained" color="primary" onClick={saveCartToBill} disabled={ context.cart._id ? false : true}>
            { context.cart.name ? 'Save' : 'Add' }
          </Button>
        </DialogActions>
        <Divider />
        <DialogContent>
          
            <div className="bill-content">
              {context.bills.map( bill => (
                <div key={bill._id} className="pointer" onClick={ () => billToCart(bill) }>
                <DialogContentText id="alert-dialog-description">
                  { bill.name }
                </DialogContentText>
                  </div>
              ))}
            </div>
          
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} color="primary" disabled={ context.cart._id ? false : true} >
            Print Ticket
          </Button>
          <Button onClick={handleClose} color="primary" disabled={ context.cart._id ? false : true} >
            Print Bill
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}