import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { ShopContext } from '../context/ShopContextProvider'
import { ButtonGroup } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    textAlign: 'center'
  },
  change: {
    marginLeft: theme.spacing(2),
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  text: {
    marginLeft: theme.spacing(2),
    flex: 1,
    textAlign: 'center',
    color: 'gray',
    padding: '20px'
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    border: '1px solid gray'
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Success({ openSuccess, setOpenSuccess, change, price, clearFields}) {
  const classes = useStyles();
    const [email, setEmail] = useState('');

  function handleClose() {
    setOpenSuccess(false);
    clearFields();
  }

  function handleChange(e){
    setEmail(e.target.value)
  }

  function newItem(){

  }

  return (
    <div>
      <Dialog fullScreen open={openSuccess} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Transaction Succeded!
            </Typography>
            <Button color="inherit" onClick={newItem}>
              New Sale
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
            <div style={{ padding: '20vh 0 5vh 0'}}>
            <Typography variant="h2" className={classes.change}>
              Change Rp {Number(localStorage.getItem('change')).toLocaleString('id')}
        </Typography>
        <Typography variant="h6" className={classes.text}>
              Out of Rp {Number(localStorage.getItem('price')).toLocaleString('id')}
        </Typography>
            </div>
        
        <Divider />
        <div className="success-sale">
          <div>
          <Typography variant="h6" className={classes.text}>
              Bagaimana pelanggan menerima struk?
          </Typography>
          </div>
          <div>
          <TextField
            className={classes.textField}
            label="Email"
            value={email}
            onChange={handleChange}
          />
          </div>
          <div className="button-primary-contained">
            Print Struk
          </div>
          <div className="button-secondary-contained">
            Tidak Perlu
          </div>
      </div>
        </DialogContent>
        
    </Dialog>
  </div>
  );
}