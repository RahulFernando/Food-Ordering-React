import { useReducer } from 'react';
import Context from './cart-context';

const INIT = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      const existingItem = state.items[existingIndex];
      let updatedItems;

      console.log(action.payload.amount);

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount + action.payload.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.payload);
      }

      return {
        items: updatedItems,
        totalAmount:
          state.totalAmount + action.payload.price * action.payload.amount,
      };

    }

    if (action.type === 'REMOVE_ITEM') {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const existingItem = state.items[existingIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;

      if (existingItem.amount === 1) {
        updatedItems = state.items.filter(item => item.id !== action.payload);
      } else {
        const updatedItem = {...existingItem, amount: existingItem.amount - 1 };
        updatedItems = [ ...state.items ];
        updatedItems[existingIndex] = updatedItem;
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
      }

    }

    if (action.type === 'CLEAR') {
      return INIT;
    }
    return state;
};

const CartProvider = (props) => {
  const [cartState, dispatch] = useReducer(cartReducer, INIT);

  const addItemHandler = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItemHandler = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCartHandler = () => {
    dispatch({ type: 'CLEAR' });
  }

  const context = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
  };
  return <Context.Provider value={context}>{props.children}</Context.Provider>;
};

export default CartProvider;
