import React, { useContext } from 'react';
import MealContext from '../../Store/meal-context';
import classes from './NavBar.module.css';

const NavBar = () => {
  const context = useContext(MealContext);
  const length = context.state.cart.length;
  const openCartHandler =()=> {
    context.dispatch({
      type: 'OPENMODAL'
    })
  }
  return (
    <div className={classes.container}>
      <h1>ReactMeals</h1>
      <div className={classes.cart} onClick={openCartHandler}>
        <h3>Your Cart</h3>
        <h3 className={classes.cartCount}>{length}</h3>
      </div>
    </div>
  )
}

export default NavBar
