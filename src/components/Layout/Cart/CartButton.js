import React from 'react';

// styles
import classes from './Cart.module.css';

import CartIcon from './CartIcon';

const CartButton = (props) => {
  return (
    <button className={classes.button} onClick={props.onCartShow}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>3</span>
    </button>
  );
};

export default CartButton;
