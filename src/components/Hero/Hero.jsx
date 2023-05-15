import React from "react";
import classes from './Hero.module.css';
import mealImage from '../../../public/Assets/meals.jpg'

const Hero = () => {
  return (
    <div className={classes.container}>
      <img src={mealImage} alt='meal image'/>
      <div className={classes.heroCard}>
        <h2>Delicious Food, Delivered To YOU</h2>
        <p>
          Choose your favourite meal from our broad selection of available meals
          and enjoy a delicious lunch or dinner at home
        </p>
        <p>All our meals are cooked with high quality ingredients, just-in-time and of course by experienced chefs</p>
      </div>
    </div>
  );
};

export default Hero;
