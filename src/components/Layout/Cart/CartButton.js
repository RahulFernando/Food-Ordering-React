import React, { useContext, useEffect, useState } from 'react';

// context
import CartContext from '../../../store/cart-context';

// styles
import classes from './Cart.module.css';

import CartIcon from './CartIcon';

const CartButton = (props) => {
  const [btnIsBump, setBtnIsBump] = useState(false);
  const cartContext = useContext(CartContext);


  const { items } = cartContext;
  const noOfItems = cartContext.items.reduce((current, item) => {
    return current + item.amount;
  }, 0)

  const btnClasses = `${classes.button} ${btnIsBump ? classes.bump : ''}`;

  useEffect(() => { 
    if (items.length === 0) {
      return;
    }
    setBtnIsBump(true);

    const timer = setTimeout(() => {
      setBtnIsBump(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    }
  }, [items])

  return (
    <button className={btnClasses} onClick={props.onCartShow}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{noOfItems}</span>
    </button>
  );
};

export default CartButton;
