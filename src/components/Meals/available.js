import React, { useEffect, useState } from 'react';
import Card from '../UI/card';
import MealItem from './MealItem/mealItem';

import classes from './available.module.css';

const Available = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://react-http-3606c-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(loadedMeals);
      setLoading(false);
    };

    fetchMeals().catch((err) => {
      setLoading(false);
      setError(err.message);
    });
  }, []);

  console.log(error);

  if (loading) {
    return <section className={classes['meals-loading']}>Loading...</section>;
  }

  if (error) {
    return (
      <section className={classes['meals-error']}>
        <p>{error}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default Available;
