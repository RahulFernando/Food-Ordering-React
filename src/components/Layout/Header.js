import React, { useContext } from 'react';

// assets
import mealsImage from '../../assets/meals.jpg';

// layouts
import CartButton from './Cart/CartButton';

// styles
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <CartButton onCartShow={props.onCartShow} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="meals" />
      </div>
    </>
  );
};

export default Header;
