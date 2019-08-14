import React, { useReducer } from 'react';
import { globalReducer, SHOW_ALERT } from '../reducers/globalReducer';

export const GlobalContext = React.createContext();

const GlobalContextProvider = props => {

  const [globalState, dispatch] = useReducer(globalReducer,
    [], () => {
    return { alert: { isShowed:false, message: '', variant:'' } }
  });

  const showAlert = (message, variant) => {
      // setCart(updatedCart);
      dispatch({ type: SHOW_ALERT, message: message, variant: variant })
  };

    return (
      <GlobalContext.Provider
        value={{
          alert: globalState.alert,
          showAlert:showAlert
        }}
      >
        {props.children}
      </GlobalContext.Provider>
    );
}

export default GlobalContextProvider;
