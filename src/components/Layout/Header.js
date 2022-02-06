import React from 'react';

// assets
import mealsImage from '../../assets/meals.jpg';

// styles
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <button>Cart</button>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="meals" />
      </div>
    </>
  );
};

export default Header;
