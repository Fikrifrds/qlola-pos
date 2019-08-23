import React, { useContext, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';
import ChooseVariantV2 from './ChooseVariantV2';
import ChooseModifier from './ChooseModifier';
import { ShopContext } from '../context/ShopContextProvider';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';

import InputQuantity from './InputQuantity';
import InputNote from './InputNote';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { MediaQueryContext } from '../context/MediaQueryContextProvider';
import shorten from '../formula/nameShorten';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditItem = ({ open, setOpen, currentItem }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const context = useContext(ShopContext);
  const mediaContext = useContext(MediaQueryContext);
  const media = mediaContext.media;
  const [quantity, setQuantity] = useState(currentItem.quantity);
  const [note, setNote] = useState(currentItem.note);
  const [variant, setVariant] = useState(currentItem.variant);
  const [variantPrice, setVariantPrice] = useState(currentItem.variantPrice);
  const [modifier, setModifier] = useState(currentItem.modifier);
  const [extra, setExtra] = useState(currentItem.extra);

  useEffect(() => {
    setQuantity(currentItem.quantity);
    setNote(currentItem.note);
    setVariant(currentItem.variant);
    setVariantPrice(currentItem.variantPrice);
    setModifier(currentItem.modifier);
    setExtra(currentItem.extra);
  },
  [open]
  )

  const input = {
      quantity: quantity,
      variant: variant,
      price: variantPrice + extra,
      modifier: modifier,
      extra: extra,
      note:note
  }

  // const clearFields = () => {
  //   setQuantity(1);
  //   setVariant(null);
  //   setVariantPrice(0)
  //   }

  const handleClose = () => {
    setOpen(false);
    // clearFields();
  }

  const handleUpdate = () => {
    context.updateProductInCart(currentItem._id, input);
    console.log('tes', currentItem._id)
    handleClose();
  }

  const deleteItem = (id) => {

    if (window.confirm('Are you sure you wish to delete this item?')){
      context.removeProductFromCart(id)
      handleClose();
    }
    
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
      <DialogActions style={{ display: 'flex', justifyContent:'space-between', flexWrap: 'wrap', margin: '0px 30px 0px 30px'}}>
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
          Rp { ( (variantPrice + extra)*quantity ).toLocaleString('id') }
          </strong>
          </DialogTitle>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Save
          </Button>
      </DialogActions>
      <Divider />
      <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText id="alert-dialog-slide-description">
            <center>{currentItem.product.name}</center>
          </DialogContentText>

          { currentItem.product.hasVariant ?
          <>
          <ChooseVariantV2
          variant ={variant} 
          setVariant ={setVariant} 
          options = { currentItem.product.variant} 
          setVariantPrice = {setVariantPrice} 
          title={currentItem.product.variantTitle}
          />
          <Divider />
          </>
          : ''
          }

          { currentItem.product.hasModifier ? 
          <>
          <ChooseModifier
            modifier={modifier} 
            setModifier={setModifier} 
            options={currentItem.product.modifier}
            extra={extra}
            setExtra={setExtra}
            title={currentItem.product.modifierTitle}
           />
        <Divider />
          </>
          :
          ''
          }

          <InputQuantity 
          quantity = {quantity} 
          setQuantity={setQuantity} 
          isMobileDevicePortrait={media.isMobileDevicePortrait}
          />
        <Divider />
          <InputNote
            note = {note} 
            setNote={setNote} 
          />
        <Divider />
        <DialogActions style={{ display: 'flex', justifyContent:'flex-start'}}>
        <Button onClick = {() => deleteItem(currentItem._id)}
          variant="outlined" color="secondary">
          Hapus
        </Button>
        </DialogActions>
      </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditItem;