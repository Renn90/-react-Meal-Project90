import React, { useContext } from "react";
import MealContext from "../../Store/meal-context";
import classes from "../Form/Form.module.css";
import classesB from "../Modal/Modal.module.css";

const Form = () => {
  const ctx = useContext(MealContext);
  const totalAmount = ctx.state.totalAmount;
  const cart = ctx.state.cart;
  const closeFormHandler = () => {
    ctx.dispatch({
      type: "CLOSEFORM",
    });
  };

  const form = ctx.state.form;
  const checkValid = (e) => {
    ctx.dispatch({
      type: "TYPINGNAME",
      value: e.target.value,
    });
  };

  const invalidName = !ctx.state.validName && ctx.state.nameIsTouched;
  const checktouched = () => {
    ctx.dispatch({
      type: "TOUCHEDNAME",
    });
  };


  const checktouchedAdd = (e) => {
    ctx.dispatch({
      type: "TOUCHEDADD",
      value: e.target.value,
    });
  };

  const checkValidAdd = (e) => {
    ctx.dispatch({
      type: "TYPINGADD",
      value: e.target.value,
    });
  };

  const invalidAdd = !ctx.state.validADD && ctx.state.ADDIsTouched;
  const formTouched = ctx.state.ADDIsTouched && ctx.state.nameIsTouched

  const formIsValid = !invalidAdd && !invalidName && formTouched;

  async function submitHandler(event){
    event.preventDefault();
    try {
      const Order = [ctx.state.cart, ctx.state.customerName, ctx.state.customerAdd]
      const response = await fetch('https://meals-5c730-default-rtdb.firebaseio.com/orders.json',{
            method: 'POST',
            body: JSON.stringify(Order),
            headers: {
              'Content-Type': 'application/json'
            }
      })
      if(response.ok){
        ctx.dispatch({
          type: "RESETSTATE",
        });
        }else{
          throw new error(response.status)
        }
   } catch(error){
     ctx.dispatch({
      type: 'ERROR'
     })
   }
  };

  return (
    <>
      {" "}
      {form && (
        <div className={classesB.container}>
          <div className={classes.card}>
            <div>
              <h4 style={{ textAlign: "center", margin: "10px" }}>
                Your Order
              </h4>
              <div className={classes.cartItems}>
                {cart.map((item) => (
                  <div key={item.id} className={classes.info}>
                    <div className={classes.name}>
                      <p>{item.name}</p>
                      <p>${item.price}</p>
                    </div>
                    <p>{item.amount}</p>
                  </div>
                ))}
              </div>
              <h4 style={{ textAlign: "center", margin: "10px" }}>
                Total amount: {totalAmount}
              </h4>
            </div>
            <form className={classes.form}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="John Doe"
                id="name"
                onChange={checkValid}
                onBlur={checktouched}
                className={invalidName ? classes.invalid : null }
              />
              <label htmlFor="address">Address</label>
              <input
                type="text"
                placeholder="NO.70 Anonyn street, City"
                id="address"
                onChange={checkValidAdd}
                onBlur={checktouchedAdd}
                className={invalidAdd ? classes.invalid : null}
              />
              <button disabled={!formIsValid} onClick={submitHandler}>
                Submit
              </button>
            </form>
          </div>
          <div className={classesB.backdrop} onClick={closeFormHandler} />
        </div>
      )}
    </>
  );
};

export default Form;
