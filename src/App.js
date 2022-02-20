import React, { useState } from 'react';
import Cart from './components/Cart/cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/meals';
import CartProvider from './store/cart-provider';

function App() {
  const [cartShown, setCartShown] = useState(false);

  const showCartHandler = () => {
    setCartShown(true);
  };

  const hideCartHandler = () => {
    setCartShown(false);
  };

  return (
    <CartProvider>
      {cartShown && <Cart onCartHide={hideCartHandler} />}
      <Header onCartShow={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
