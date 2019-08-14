import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContextProvider';

import './MainNavigation.css';

const mainNavigation = props => {
  const context = useContext(ShopContext);

  return (
  <header className="main-navigation">
    <nav>
      <ul>
        <li>
          <NavLink to="/">Products</NavLink>
        </li>
        <li>
          <NavLink to="/cart">Cart ({context.cart.reduce((count, curItem) => {
            return count + curItem.quantity;
          }, 0)})</NavLink>
        </li>
      </ul>
    </nav>
  </header>
  )
  }

export default mainNavigation;
