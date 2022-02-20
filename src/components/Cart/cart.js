import React from 'react';
import Modal from '../UI/modal';

import classes from './cart.module.css';

const Cart = (props) => {
  const items = (
    <ul className={classes['cart-items']}>
      {[{ id: 'c1', name: 'Shushi', amount: 2, price: 12.99 }].map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onCartHide}>
      {items}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>35.65</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onCartHide}>Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
