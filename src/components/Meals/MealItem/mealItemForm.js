import React, { useRef, useState } from 'react';
import Input from '../../UI/input';

import classes from './mealForm.module.css';

const MealItemForm = (props) => {
  const amountRef =  useRef();
  const [valid, setValid] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();

    const amount = +amountRef.current.value;

    if(amount === 0) {
      setValid(false);
      return;
    }

    props.onAddItemCart(amount);
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!valid && <p>Please enter valid amount between 1 to 5</p>}
    </form>
  );
};

export default MealItemForm;
