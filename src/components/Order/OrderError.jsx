import React from 'react'
import { useContext } from 'react';
import classes from "../Form/Form.module.css";
import classesB from "../Modal/Modal.module.css";
import MealContext from "../../Store/meal-context";

const OrderSucc = () => {
  const ctx = useContext(MealContext);
      const closeOrder=()=>{
         ctx.dispatch({
          type: 'CLOSEERROR'
         })
      }


  return (
    <>
    {ctx.state.orderErrorMod &&
    <div className={classesB.container}>
      <div className={classes.card}>
        <h2>SOMETHING WENT WRONG</h2>
        <p>Please try again</p>
        <button className={classes.btn} onClick={closeOrder}>CLOSE</button>
      </div>
      <div className={classesB.backdrop} onClick={closeOrder}/>
    </div> }
    </>
  )
}

export default OrderSucc
