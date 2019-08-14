import React, { useEffect, useState, useReducer } from 'react';
import { userReducer, LOGIN} from '../reducers/userReducer';

export const UserContext = React.createContext();

const UserContextProvider = props => {
  const [userState, dispatch] = useReducer(userReducer,
    [], () => {
    const localData = localStorage.getItem('carts');    
    return { cart : localData ? JSON.parse(localData) : [] }
  });

  const login = input => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: LOGIN, input: input})
    }, 100);
  };

    return (
      <UserContext.Provider
        value={{
          user: userState.user,
          login: login
        }}
      >
        {props.children}
      </UserContext.Provider>
    );
}

export default UserContextProvider;