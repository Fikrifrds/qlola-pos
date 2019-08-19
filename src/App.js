import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ShopState from './context/ShopContextProvider';
import GlobalState from './context/GlobalContextProvider';
import ProductState from './context/ProductContextProvider';
import MainNavigation from './components/MainNavigation'
import ProductsPage from './pages/Products';
import CartPage from './pages/Cart';
import Example from './pages/Example';
import BottomAppBar from './components/BottomAppBar'
import './App.css';
import Snackbars from './components/Snackbars';

const App = props => {

    return (
      <GlobalState>
      <ShopState>
       
      <ProductState>
        <BrowserRouter>
        <>
        {/* <MainNavigation /> */}
          <Switch>
            
            <Route path="/" component={ProductsPage} exact />
            <Route path="/example" component={Example} exact />
            <Route path="/cart" component={CartPage} exact />
            
          </Switch>
          <BottomAppBar />
        </>
        </BrowserRouter>
        
        </ProductState>
      </ShopState>
      </GlobalState>

    );
}

export default App;
