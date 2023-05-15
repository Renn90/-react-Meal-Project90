import React, { useContext, useEffect, useState } from "react";
import MealContext from "../../Store/meal-context";
import classes from "../Meals/MealSection.module.css";
import MealItem from "./MealItem";

const MealSection = () => {
  const [foods, setfoods] = useState([]);
  const [isLoading, setisLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMeals = () => {
    setisLoading(true)
    setError(null)
    fetch("https://meals-5c730-default-rtdb.firebaseio.com/meals.json")
      .then((response) => {
        if(!response.ok){
          setisLoading(false)
         throw new Error('Failed to fetch meals. Status: ' + response.status)
        }
        return response.json();
      })
      .then((data) => {
        setisLoading(false)
        if (data) { // Check if data is not null or undefined
          setfoods(data);
        }
      }).catch((error) => {
          setisLoading(false)
          setError(error.message)
      });
  };

  useEffect(() => {
    fetchMeals();
  },[]);

  const ctx = useContext(MealContext);

  const addtoCartHandler = (meal) => {
    ctx.dispatch({
      type: "ADDTOCART",
      value: meal,
    });
  };

  return (
    <div className={classes.container}>
        {isLoading && !error && <div>Loading...</div> }
        { error && <div>{error}</div>}
      {!isLoading && !error && <div style={{width: '100%'}}>
      {foods.length > 0 && !isLoading && foods.map((meal) => (
        <MealItem
          key={meal.id}
          name={meal.name}
          amount={meal.amount}
          description={meal.description}
          price={meal.price}
          onAddtoCart={addtoCartHandler}
          clickFunction={() => addtoCartHandler(meal)}
        />
      ))}
      {foods.length < 1 && !isLoading && <div style={{textAlign: 'center'}}>No foods Found</div>}
      </div>}
    </div>
  );
};

export default MealSection;
