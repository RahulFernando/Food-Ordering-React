import React, { useContext } from 'react';
import CartContext from '../../../store/cart-context';

import classes from './meal.module.css';
import MealItemForm from './mealItemForm';

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const addItemCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddItemCart={addItemCartHandler} id={props.id} />
      </div>
    </li>
  );
};

export default MealItem;
