import React, { useContext, useState } from 'react';
import Modal from '../UI/modal';
import CartItem from './CartItem';
import Checkout from './checkout';

import cartContext from '../../store/cart-context';

import classes from './cart.module.css';

const Cart = (props) => {
  const cartCtx = useContext(cartContext);

  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (data) => {
    setIsSubmitting(true);
    const response = await fetch(
      'https://react-http-3606c-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({ user: data, ordered: cartCtx.items }),
      }
    );

    if (response.ok) {
      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
    }
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onCartHide}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const items = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalContent = (
    <>
      {items}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onCartHide} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const submittingContent = <p>Sending...</p>;
  const didSubmitContent = (
    <>
      <p>Order sent</p>{' '}
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onCartHide}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onCartHide}>
      {!isSubmitting && !didSubmit && modalContent}
      {isSubmitting && submittingContent}
      {didSubmit && !isSubmitting && didSubmitContent}
    </Modal>
  );
};

export default Cart;
