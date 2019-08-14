import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { GlobalContext } from '../context/GlobalContextProvider'


function MyApp() {
    const globalContext = useContext(GlobalContext)
const { isShowed, message, variant } = globalContext.alert;

  const { enqueueSnackbar } = useSnackbar();

  const showAlert = (message, variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };

    if(isShowed){
    showAlert((message, variant));
    }

return (
    <div onClick={ () => globalContext.showAlert('asdsadad', 'warning') }>
        ShowAlert 
    </div>
)
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}
    anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>>
      <MyApp />
    </SnackbarProvider>
  );
}