import React from "react";
import classes from "../Meals/MealItem.module.css";

const MealItem = (props) => {
  return (
        <>
        <div className={classes.container}>
            <div className={classes.itemInfo}>
              <h2>{props.name}</h2>
              <i>{props.description}</i>
              <h2 className={classes.price}>${props.price}</h2>
            </div>
            <div>
              {/* <span className={classes.amount}>
                <h2>Amount</h2>
                <span>{props.amount}</span>
              </span> */}
              <div className={classes.addBtn} onClick={props.clickFunction}>
                + Add
              </div>
            </div>
          </div>
          <hr />
        </>
  );
};

export default MealItem;
