import { useReducer } from 'react';
import Context from './cart-context';

const INIT = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        items: state.items.concat(action.payload),
        totalAmount:
          state.totalAmount + action.payload.price * action.payload.amount,
      };
      default:
        return state;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatch] = useReducer(cartReducer, INIT);
  const addItemHandler = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };
  const removeItemHandler = (id) => {};
  const context = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };
  return <Context.Provider value={context}>{props.children}</Context.Provider>;
};

export default CartProvider;
