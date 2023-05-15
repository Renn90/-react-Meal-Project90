import React, { useReducer } from "react";

const MealContext = React.createContext({
  cart: [],
  modal: false,
  form: false,
  validName: true,
  nameIsTouched: false,
  totalAmount: 0.0,
  validADD: true,
  ADDIsTouched: false,
  customerName: "",
  customerAdd: "",
  orderSuccessfulMod: false,
  orderErrorMod: false,
});

const cartReducer = (state, action) => {
  if (action.type === "ADDTOCART") {
    const mealItem = state.cart.find((meal) => meal.id === action.value.id);
    if (mealItem) {
      const updatedCart = state.cart.map((meal) =>
        meal.id === action.value.id
          ? {
              ...meal,
              amount: meal.amount + 1,
            }
          : meal
      );
      return {
        ...state,
        cart: updatedCart,
        modal: true,
        totalAmount: state.totalAmount + action.value.price,
      };
    } else {
      return {
        ...state,
        cart: [...state.cart, action.value],
        modal: true,
        totalAmount: state.totalAmount + action.value.price,
      };
    }
  }
  if (action.type === "REMOVEITEM") {
    const meal = state.cart.find((meal) => meal.id === action.value.id);
    const remMeal = meal.amount > 1; 
    if (remMeal) {
      const mealamount = (meal) => (meal.amount <= 1 ? null : meal.amount - 1);
      const updatedCart = state.cart.map((meal) =>
        meal.id === action.value.id
          ? { ...meal, amount: mealamount(meal) }
          : meal
      );
      return {
        ...state,
        cart: updatedCart,
        totalAmount: state.totalAmount - action.value.price,
      };
    } else {
      const removeditem = state.cart.filter((meals) => {
        return meals.id !== action.value.id;
      });
      return {
        ...state,
        cart: removeditem,
        totalAmount: state.totalAmount - action.value.price,
      };
    }
  }
  if (action.type === "CLOSEMODAL") {
    return { ...state, modal: false };
  }
  if (action.type === "OPENMODAL") {
    return { ...state, modal: true };
  }
  if (action.type === "CLOSEFORM") {
    return { ...state, form: false, customerName: "",
    customerAdd: "", nameIsTouched: false, ADDIsTouched: false};
  }
  if (action.type === "OPENFORM") {
    return { ...state, form: true, modal: false };
  }
  if (action.type === "TYPINGNAME") {
    if (action.value.trim() === "") {
      return { ...state, validName: false, nameIsTouched: true };
    } else {
      return {
        ...state,
        validName: true,
        nameIsTouched: true,
        customerName: action.value,
      };
    }
  }
  if (action.type === "TOUCHEDNAME") {
    return { ...state, nameIsTouched: true };
  }
  if (action.type === "TYPINGADD") {
    if (action.value.trim() === "") {
      return { ...state, validADD: false, ADDIsTouched: true };
    } else {
      return {
        ...state,
        validADD: true,
        ADDIsTouched: true,
        customerAdd: action.value,
      };
    }
  }
  if (action.type === "TOUCHEDADD") {
    return { ...state, ADDIsTouched: true };
  }
  if (action.type === "RESETSTATE") {
    return {
      ...state,
      cart: [],
      totalAmount: 0,
      customerName: "",
      customerAdd: "",
      form: false,
      validADD: false,
      validName: false,
      nameIsTouched: false,
      ADDIsTouched: false,
      orderSuccessfulMod: true
    };
  }
  if(action.type === 'CLOSEORDER'){
      return {...state, orderSuccessfulMod: false}
  }
  if(action.type === 'ERROR'){
    return {...state, form: false,orderErrorMod: true,customerName: "",
    customerAdd: "",}
  }
  if(action.type === 'CLOSEERROR'){
    return {...state, orderErrorMod: false}
  }
  return state;
};

export const MealProvider = (props) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: [],
    amount: 1,
    modal: false,
    totalAmount: 0,
  });

  return (
    <MealContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </MealContext.Provider>
  );
};

export default MealContext;
