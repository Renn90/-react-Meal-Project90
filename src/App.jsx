import ReactDOM from "react-dom";
import "./App.css";
import Hero from "./components/Hero/Hero";
import MealSection from "./components/Meals/MealSection";
import Modal from "./components/Modal/Modal";
import NavBar from "./components/Navbar/NavBar";
import { MealProvider } from "./Store/meal-context";
import Form from "./components/Form/Form";
import OrderSucc from "./components/Order/OrderSucc";
import OrderError from './components/Order/OrderError'


function App() {
  return (
    <div className="App">
      <MealProvider>
        <NavBar />
        <Hero />
        <MealSection />
        <Modal />
        <OrderError />
       <OrderSucc />
        <Form />
      </MealProvider>
    </div>
  );
}

export default App;
