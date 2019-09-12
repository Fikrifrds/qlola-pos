import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ShopState from './context/ShopContextProvider';
import GlobalState from './context/GlobalContextProvider';
import ProductState from './context/ProductContextProvider';
import MainNavigation from './components/MainNavigation'
import PointOfSale from './pages/PointOfSale';
import Products from './pages/Products';
import CartPage from './pages/Cart';
import Transactions from './pages/Transactions';
import Settings from './pages/Settings';
import Example from './pages/Example';
import BottomAppBar from './components/BottomAppBar'
import './App.css';
import Snackbars from './components/Snackbars';
import CssBaseline from '@material-ui/core/CssBaseline';
import NewProduct from './pages/NewProduct';

const App = props => {

    return (
      <React.Fragment>
      <CssBaseline />
      <GlobalState>
      <ShopState>
       
      <ProductState>
        <BrowserRouter>
        <>
        {/* <MainNavigation /> */}
          <Switch>
            
            <Route path="/" component={PointOfSale} exact />
            <Route path="/example" component={Example} exact />
            <Route path="/cart" component={CartPage} exact />
            <Route path="/transactions" component={Transactions} exact />
            <Route path="/products" component={Products} exact />
            <Route path="/settings" component={Settings} exact />
            <Route path="/products/new" component={NewProduct} exact />
            
          </Switch>
          <BottomAppBar />
        </>
        </BrowserRouter>
        
        </ProductState>
      </ShopState>
      </GlobalState>
      </React.Fragment>
    );
}

export default App;
