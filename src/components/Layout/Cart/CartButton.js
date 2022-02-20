import React, { useContext } from 'react';

// context
import CartContext from '../../../store/cart-context';

// styles
import classes from './Cart.module.css';

import CartIcon from './CartIcon';

const CartButton = (props) => {
  const cartContext = useContext(CartContext);
  
  const noOfItems = cartContext.items.reduce((current, item) => {
    return current + item.amount;
  }, 0)

  return (
    <button className={classes.button} onClick={props.onCartShow}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{noOfItems}</span>
    </button>
  );
};

export default CartButton;
