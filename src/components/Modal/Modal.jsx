import React, { useContext } from "react";
import MealContext from "../../Store/meal-context";
import classes from "../Modal/Modal.module.css";

const Modal = () => {
   const ctx = useContext(MealContext)
   const amount = ctx.state.totalAmount
   const closeModalHandler =()=> {
    ctx.dispatch({
      type: 'CLOSEMODAL',
     })
   }
   const addtocart =(meals)=> {
    ctx.dispatch({
      type: 'ADDTOCART',
      value: meals
     })
   }
   const removefromcart =(meals)=> {
    ctx.dispatch({
      type: 'REMOVEITEM',
      value: meals
     })
   }
   const openCheckoutForm =()=> {
    ctx.dispatch({
      type: 'OPENFORM',
     })
   }

  return (
    <>
    {ctx.state.modal ?  
    <div className={classes.container}>
      <div className={classes.card}>
        {ctx.state.cart.length > 0 ? 
                <div>
      {ctx.state.cart.map((meals)=>(
        <div className={classes.cardItem} key={meals.id}>
          <div className={classes.cardInfo}>
            <h2>{meals.name}</h2>
            <span className={classes.price}>
              <h2>${meals.price}</h2>
              <span>X {meals.amount}</span>
            </span>
          </div>
          <div className={classes.add}>
            <span onClick={()=>removefromcart(meals)}>-</span> 
            <span onClick={()=>addtocart(meals)}>+</span>
          </div>
        </div>
        ))}
        </div>
      : <div className={classes.empty}>No items in cart</div> }
        <hr />
        <div className={classes.order}>
        <div className={classes.total}>
            <h2>Total Amount</h2>
            <h2>${amount.toFixed(2)}</h2>
        </div>
        <div className={classes.cta}>
            <div className={classes.close} onClick={closeModalHandler}>Close</div>
            <button disabled={ctx.state.cart.length < 1} className={classes.open} onClick={openCheckoutForm}>Order</button>
        </div>
        </div>
      </div>
      <div className={classes.backdrop} onClick={closeModalHandler}/>
    </div> : null}
    </>
  );
};

export default Modal;
