import React, { useContext, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Close from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import { ShopContext } from '../context/ShopContextProvider';
import { MediaQueryContext } from '../context/MediaQueryContextProvider';
import ChooseModifier from './ChooseModifier';
import ChooseVariantV2 from './ChooseVariantV2';
import InputQuantity from './InputQuantity';
import InputNote from './InputNote';
import uuid from "uuid";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import shorten from '../formula/nameShorten';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewItem({ open, setOpen, product }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const context = useContext(ShopContext);
  const mediaContext = useContext(MediaQueryContext);
  const media = mediaContext.media;
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  const [variant, setVariant] = useState(null);
  const [variantPrice, setVariantPrice] = useState(0);
  const [modifier, setModifier] = useState([]);
  const [extra, setExtra] = useState(0);

  useEffect(() => {
    if(product.hasVariant){
      setVariant(product.variantDefault);
      setVariantPrice(product.variant[product.variantDefault].price);
    } else {
      setVariant(null);
      setVariantPrice(product.price);
    }
    setQuantity(1);
  },
  [open]
  )

  const clearFields = () => {
    setQuantity(1);
    setVariant(null);
    setVariantPrice(0);
    setModifier([])
    setNote('')
    }

  const handleClose = () => {
    setOpen(false);
    clearFields();
  }

  const handleSubmit = () => {
    const input = {
      _id: uuid.v4(),
      product: product,
      quantity: quantity,
      variant: variant,
      modifier : modifier,
      variantPrice:variantPrice,
      price: variantPrice ? variantPrice + extra : product.price + extra,
      extra: extra,
      note: note
    }
    context.addProductToCart(input);
    handleClose();
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
      <DialogActions style={{ display: 'flex', justifyContent:'space-between', flexWrap: 'wrap', margin: '0px 30px 0px 30px' }}>
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
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
        <Divider />
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText id="alert-dialog-slide-description">
            <center>{product.name}</center>
          </DialogContentText>
          { product.hasVariant ?
          <>
            <ChooseVariantV2
          variant={variant} 
          setVariant={setVariant} 
          options={product.variant} 
          setVariantPrice={setVariantPrice} 
          title={product.variantTitle}
          />
          
          <Divider />
          </>
          :
          ''
          }
          
          { product.hasModifier ? 
          <>
          <ChooseModifier
            modifier={modifier} 
            setModifier={setModifier} 
            options={product.modifier}
            extra={extra}
            setExtra={setExtra}
            title={product.modifierTitle}
           />
          <Divider />
          </>
          :
          ''
          }
          
          <InputQuantity quantity={quantity} setQuantity={setQuantity} isMobileDevicePortrait={media.isMobileDevicePortrait} />
          <Divider />
          <InputNote note={note} setNote={setNote} />
      

        </DialogContent>
      </Dialog>
    </div>
  );
}