import React from 'react'
import { useContext } from 'react';
import classes from "../Form/Form.module.css";
import classesB from "../Modal/Modal.module.css";
import MealContext from "../../Store/meal-context";

const OrderSucc = () => {
  const ctx = useContext(MealContext);
      const closeOrder=()=>{
         ctx.dispatch({
          type: 'CLOSEORDER'
         })
      }


  return (
    <>
    {ctx.state.orderSuccessfulMod &&
    <div className={classesB.container}>
      <div className={classes.card}>
        <h2>ORDER PLACED!</h2>
        <button className={classes.btn} onClick={closeOrder}>CLOSE</button>
      </div>
      <div className={classesB.backdrop} onClick={closeOrder}/>
    </div> }
    </>
  )
}

export default OrderSucc
